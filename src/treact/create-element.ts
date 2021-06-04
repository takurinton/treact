type NodeType = VNode | string | number;

type Props = { [key: string]: string | Function } | null;

type keyAttribute = string | number | null;

type ElementAttachedNeedAttr = HTMLElement & {
  vdom?: NodeType;
};

type TextAttachedVNode = Text & { vdom?: NodeType;};

type OldNodeElement = ElementAttachedNeedAttr | TextAttachedVNode | null;

interface VNode {
  nodeName: keyof ElementTagNameMap;
  props: Props;
  oldNode: OldNodeElement;
  children: NodeType[];
  // nodeType: 3 | null;
  // keyType: keyAttribute;
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

function h(
  nodeName: VNode['nodeName'],
  props: VNode['props'],
  ...children: VNode['children']
): VNode {
  let oldNode: VNode['oldNode'];
  return createVNode(nodeName, props, oldNode, children);
}

// 仮想DOM を生成する
// ここはシンプル、preact の h 関数や React の createElement 関数と同じ
function createVNode(
  nodeName: VNode['nodeName'],
  props: VNode['props'],
  oldNode : VNode['oldNode'] = null,
  children: VNode['children']
): VNode {
  return { nodeName, props, oldNode, children };
}


// 仮想DOM を使用して実DOM を生成する
function createElement(node: NodeType): HTMLElement | Text {
  if (!isVNode(node)) {
    return document.createTextNode(node.toString());
  }

  console.log(node)
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