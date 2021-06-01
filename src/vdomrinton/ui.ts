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
// ここはシンプル、preact の h 関数や React の createElement 関数と同じ
export function createElement(
  nodeName: keyof ElementTagNameMap,
  attributes: Attributes,
  ...children: NodeType[]
): VNode {
  return { nodeName, attributes, children };
}