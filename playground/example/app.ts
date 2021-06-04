import { h, Treact, Component, ActionTree } from '../../src/treact';

type State = {}
const state: State = {}

interface Actions extends ActionTree<State> {}
const actions: Actions = {}

const component: Component<State, Actions> = (state, actions) => {
  return h('div', {}, 'hello world');
}

new Treact<State, Actions>({
  el: document.getElementById('takurinton'),
  state,
  component,
  actions
})