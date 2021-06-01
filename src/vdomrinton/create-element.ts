// 
type NodeType = VNode | string | number;
type Attributes = { [key: string]: string | Function };

// 見た目
export interface View<State, Actions> {
  (state: State, actions: Actions): VNode;
}

// 仮想DOM
export interface VNode {
  nodeName: keyof ElementTagNameMap;
  attributes: Attributes;
  children: NodeType[];
}

// 引数が NodeType として適切かどうかを確かめる(VNode を確かめる)
function isVNode(node: NodeType): node is VNode {
  return typeof node !== "string" && typeof node !== "number";
}

// event かどうかを確かめる
// on がついたら event として扱う(ex. onchange, onclick など)
function isEventAttr(attr: string): boolean {
  return /^on/.test(attr);
}

// target に属性を付与する
function setAttributes(target: HTMLElement, attrs: Attributes): void {
  for (let attr in attrs) {
    if (isEventAttr(attr)) {
      const eventName = attr.slice(2);
      target.addEventListener(eventName, attrs[attr] as EventListener);
    } else {
      target.setAttribute(attr, attrs[attr] as string);
    }
  }
}

// 仮想DOM を生成する
// ここはシンプル、preact の h 関数や React の createVNode 関数と同じ
export function createVNode(
  nodeName: keyof ElementTagNameMap,
  attributes: Attributes,
  ...children: NodeType[]
): VNode {
  const vnode = { nodeName, attributes, children };
  // TODO: options を追加して条件分岐を行う
  return vnode;
}

// 仮想DOM を使用して実DOM を生成する
export function createElement(node: NodeType): HTMLElement | Text {
  if (!isVNode(node)) {
    return document.createTextNode(node.toString());
  }

  const el = document.createElement(node.nodeName);
  setAttributes(el, node.attributes);

  node.children.forEach(
    // ここで仮想DOMを生成してる
    child => el.appendChild(createElement(child))
  );

  return el;
}

// render 関数
// TODO: hydrate 関数も作る
export function render(target: HTMLElement, vnode: NodeType): HTMLElement | Text {
  return target.appendChild(createElement(vnode));
}