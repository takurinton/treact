type NodeType = VNode | string | number;

type Props = { [key: string]: string | Function } | null;

// type keyAttribute = string | number | null;

type ElementAttachedNeedAttr = HTMLElement & {
  vdom?: NodeType;
};

type TextAttachedVNode = Text & { vdom?: NodeType;};

type OldNodeElement = ElementAttachedNeedAttr | TextAttachedVNode | null;
type NewNodeElement = ElementAttachedNeedAttr | TextAttachedVNode | null;

interface VNode {
  nodeName: keyof ElementTagNameMap;
  props: Props;
  children: NodeType[];
  oldNode: OldNodeElement;
  newNode: NewNodeElement;
}

// 引数が NodeType として適切かどうかを確かめる(VNode を確かめる)
const isVNode = (node: NodeType): node is VNode => typeof node !== "string" && typeof node !== "number";

// event かどうかを確かめる
// on がついたら event として扱う(ex. onchange, onclick など)
const isEventAttr = (attr: string): boolean => /^on/.test(attr);

// target に属性を付与する
const setAttributes = (target: HTMLElement, attrs: Props): void => {
  for (let attr in attrs) {
    if (isEventAttr(attr)) {
      const eventName = attr.slice(2);
      target.addEventListener(eventName, attrs[attr] as EventListener);
    } else {
      target.setAttribute(attr, attrs[attr] as string);
    }
  }
}

// ユーザーが仮想DOM を生成するときに使用する関数、更新は createVNode 関数で行う
const  h = (
  nodeName: VNode['nodeName'],
  props: VNode['props'],
  ...children: VNode['children']
): VNode => (createVNode(nodeName, props, children, null, null))

// 仮想DOM を生成する
// ここはシンプル、preact の h 関数や React の createElement 関数と同じ
const createVNode = (
  nodeName: VNode['nodeName'],
  props: VNode['props'],
  children: VNode['children'],
  oldNode : VNode['oldNode'],
  newNode: VNode['newNode']
): VNode => ({ nodeName, props, children, oldNode, newNode });


// 仮想DOM を使用して実DOM を生成する
const createElement = (node: NodeType): HTMLElement | Text => {
  if (!isVNode(node)) {
    return document.createTextNode(node.toString());
  }

  const el = document.createElement(node.nodeName);
  setAttributes(el, node.props);

  node.children.forEach(
    // ここで仮想DOMを生成してる
    child => el.appendChild(createElement(child))
  );

  return el;
}

export {
  NodeType,
  Props,
  VNode,
  isVNode, 
  isEventAttr,
  h,
  createVNode,
  createElement,
}