import { createElement } from './vdomrinton/ui';

// 仮想DOMツリーの生成
const el = createElement('div', { id: 'app', class: 'main'},
    createElement('p', { id: 'name' }, 'hello world!!'),
    createElement('input', {
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