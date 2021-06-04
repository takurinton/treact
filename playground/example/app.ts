import { h } from '../../src/treact';
import { render } from '../../src/treact/_render';

const handleClick = () => {
  state.members.push('takuriton');
}

interface State {
  members: string[];
};

const state: State = {
  members: ['hoge', ]
};

const vnode = h(
  'div', {}, 
    h('button', { onclick: handleClick }, 'button'),
    h('ul', {}, ...state.members.map(member => h('li', {}, member)))
);

const element = document.getElementById('takurinton');
render(vnode, element, state);
