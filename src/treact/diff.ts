import { NodeType, Attributes, VNode, isVNode, isEventAttr, createElement } from './create-element';

enum ChangedType {
  None, // 変更なし
  Type, // node の型
  Text, // text node
  Node, // node 名が違う
  Value, // 値
  Attr, // 属性
};

// DOM の変更を検知する
// hyperapp ではこれくらいシンプル、こんなんでいいのか？(https://github.com/jorgebucaran/hyperapp/blob/e64faca60944bb5098f80f0daec15bbafb78765e/index.js#L324-L326)
// 上で指定した型について確認する、何もなければ None が返る
function hasChanged(a: NodeType, b: NodeType): ChangedType {
    if (typeof a !== typeof b) return ChangedType.Type;
    if (!isVNode(a) && a !== b) return ChangedType.Text;
    if (isVNode(a) && isVNode(b)) {
      if (a.nodeName !== b.nodeName) return ChangedType.Node;
      if (a.attributes.value !== b.attributes.value) return ChangedType.Value;
      if (JSON.stringify(a.attributes) !== JSON.stringify(b.attributes)) return ChangedType.Attr;
    }
    return ChangedType.None;
};

function updateAttributes(
  target: HTMLElement,
  oldAttrs: Attributes,
  newAttrs: Attributes
): void {
  for (let attr in oldAttrs) {
    if (!isEventAttr(attr)) {
      target.removeAttribute(attr);
    }
  }
  for (let attr in newAttrs) {
    if (!isEventAttr(attr)) {
      target.setAttribute(attr, newAttrs[attr] as string);
    }
  }
}

// updateAttributesでやりたかったけど、value属性としては動かないので別途作成
function updateValue(target: HTMLInputElement, newValue: string) {
  target.value = newValue;
}

// 検知した変更を実行する
// oldNode と newNode の比較を行うことで変更部分だけを更新する
// render 関数とも絡めて実装したいここらへん
function updateElement(
  parent: HTMLElement,
  oldNode: NodeType,
  newNode: NodeType,
  index = 0
): void {
  // oldNode がない場合は新しい Node を作成する
  if (!oldNode) {
    parent.appendChild(createElement(newNode));
    return;
  }

  // newNode がない場合は削除する
  const target = parent.childNodes[index];
  if (!newNode) {
    parent.removeChild(target);
    return;
  }

  // 変更を検知する
  const changeType = hasChanged(oldNode, newNode);

  // 型によって変更を行う
  switch (changeType) {
    case ChangedType.Type:
    case ChangedType.Text:
    case ChangedType.Node:
      parent.replaceChild(createElement(newNode), target);
      return;
    case ChangedType.Value:
      updateValue(target as HTMLInputElement, (newNode as VNode).attributes.value as string);
      return;
    case ChangedType.Attr:
      updateAttributes(target as HTMLElement, (oldNode as VNode).attributes, (newNode as VNode).attributes);
      return;
  }

  // 更新する
  if (isVNode(oldNode) && isVNode(newNode)) {
    for (let i = 0; i < newNode.children.length || i < oldNode.children.length; i++) {
      updateElement(target as HTMLElement, oldNode.children[i], newNode.children[i], i);
    }
  }
  
//   return parent;
};

export { hasChanged, updateElement };