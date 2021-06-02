import { createVNode, render } from './treact';

// 仮想DOMツリーの生成
const vdom = createVNode('div', { id: 'app', class: 'main'},
    createVNode('h1', { id: 'name' }, 'hello world!!'),
    createVNode('button', {
            id: 'increment',
            onclick: () => {
                console.log('hello world');
            }
        },
        'click me!!'
    )
);

const app = document.getElementById('app');
render(vdom, app);