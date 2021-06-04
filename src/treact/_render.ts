import { VNode, createElement } from "./create-element";
import { updateElement, hasChanged } from './diff';


export const render = (vnode: VNode, parent: HTMLElement, state: any) => {

    let oldNode, newNode;

    if (oldNode) {
        updateElement(parent, oldNode, newNode);
    } else {
        newNode = vnode
        parent.appendChild(createElement(newNode));
    }

    oldNode = newNode;
    console.log(oldNode)
}
