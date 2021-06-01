import { createVNode } from './vdomrinton/create-element';

// 仮想DOMツリーの生成
const el = createVNode('div', { id: 'app', class: 'main'},
    createVNode('p', { id: 'name' }, 'hello world!!'),
    createVNode('input', {
            type: 'button',
            id: 'increment',
            onclick: () => {
                console.log('hello world');
            }
        },
        'click me!!'
    )
);

console.log(el)
// >>> npm run start
// {
//     nodeName: 'div',
//     attributes: { id: 'main' },
//     children: [
//       { nodeName: 'p', attributes: [Object], children: [Array] },
//       { nodeName: 'button', attributes: [Object], children: [Array] }
//     ]
// }