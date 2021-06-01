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

// 仮想DOM を生成する
// ここはシンプル、preact の h 関数や React の createVNode 関数と同じ
export function createVNode(
  nodeName: keyof ElementTagNameMap,
  attributes: Attributes,
  ...children: NodeType[]
): VNode {
  const vnode = { nodeName, attributes, children };
  // options を追加して条件分岐を行う
  return vnode;
}