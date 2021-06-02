import { NodeType, createElement } from './create-element';

// render 関数
export function render(vnode: NodeType, target: HTMLElement, replaceNode: HTMLElement | object = undefined): HTMLElement | Text {
    // ここで hydration の処理を書く
    // createElement の中に処理を書くか、createElement をこっちに持ってきてもいいかも
    // どちらにせよ差分検知を実装した後に考える
    // let isHydrating = typeof replaceNode === 'function';
    // let oldVNode = isHydrating ? null : ''; 
  
    return target.appendChild(createElement(vnode));
}
  
// hydration 
export function hydrate(vnode: NodeType, target: HTMLElement): HTMLElement | Text {
    return render(vnode, target, hydrate);
}