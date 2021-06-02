import { createVNode, Treact, Component, ActionTree } from './treact';

type State = {}
const state: State = {}

interface Actions extends ActionTree<State> {}
const actions: Actions = {}

const component: Component<State, Actions> = () => {
  return createVNode(
    'div',
    {},
    'hello world'
  )
}

new Treact<State, Actions>({
  el: document.getElementById('app'),
  state,
  component,
  actions
})
