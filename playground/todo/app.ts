import { h, Treact, Component, ActionTree } from '../../src/treact';

type Task = string
type Form = {
  title: string
  hasError: boolean
}

type State = {
  tasks: Task[]
  form: Form
}
const state: State = {
  tasks: [],
  form: {
    title: '',
    hasError: false
  }
}

interface Actions extends ActionTree<State> {
  validate: (state: State, title: string) => boolean
  createTask: (state: State, title: string) => void
  removeTask: (state: State, index: number) => void
}
const actions: Actions = {
  validate(state, title: string) {
    if (!title || title.length < 3 || title.length > 20) {
      state.form.hasError = true
    } else {
      state.form.hasError = false
    }

    return !state.form.hasError
  },

  createTask(state, title = '') {
    state.tasks.push(title)
    state.form.title = ''
  },

  removeTask(state, index: number) {
    state.tasks.splice(index, 1)
  }
}

const component: Component<State, Actions> = (state, actions) => {
  return h(
    'div',
    {
      style: 'padding: 2rem;'
    },
    h(
      'h1',
      {
        style: 'margin-bottom: 2rem;'
      },
      h('i', { class: 'nes-icon heart is-medium' }),'treact todo app'),
    h(
      'form',
      {
        style: 'margin-bottom: 2rem;'
      },
      h(
        'div',
        {
          style: 'margin-bottom: 1rem;',
        },
        h(
          'label',
          {
            for: 'task-title'
          },
          'Title: '
        ),
        h('input', {
          type: 'text',
          id: 'task-title',
          value: state.form.title,
          oninput: (ev: Event) => {
            const target = ev.target as HTMLInputElement
            state.form.title = target.value
            actions.validate(state, target.value)
          }
        }),
      ),
      h(
        'button',
        {
          type: 'button',
          onclick: () => {
            if (state.form.hasError) return
            actions.createTask(state, state.form.title)
          }
        },
        'Create'
      )
    ),
    h(
      'ul',
      {},
      ...state.tasks.map((task, i) => {
        return h(
          'li',
          {
            style: 'margin-bottom: 1rem;'
          },
          task,
          h(
            'button',
            {
              type: 'button',
              style: 'margin-left: 1rem;',
              onclick: () => actions.removeTask(state, i)
            },
            '×'
          )
        )
      })
    )
  )
}

new Treact<State, Actions>({
  el: document.getElementById('takurinton'),
  state,
  component,
  actions
})