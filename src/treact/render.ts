import { VNode, createElement } from "./create-element";
import { updateElement } from './diff';

// action 用
export type ActionType<State> = (state: State, ...data: any) => void | any;
export type ActionTree<State> = {
  [action: string]: ActionType<State>
};

// コンポーネント用
export interface Component<State, Actions> {
  (state: State, actions: Actions): VNode;
};

// Treact クラスの引数用
interface TreactConstructor<State, Actions extends ActionTree<State>> {
    el: Element | string
    component: Component<State, Actions>
    state: State
    actions: Actions
};
  
export class Treact<State, Actions extends ActionTree<State>> {
  // 引数たち
  private readonly el: Element; // 'app' 的な感じで文字列だったらgetElementByIdで持ってくる、elementだったらそのまま適用する
  private readonly component: TreactConstructor<State, Actions>['component']; // コンポーネント(vdom)
  private readonly state: TreactConstructor<State, Actions>['state']; // state を受け取る
  private readonly actions: TreactConstructor<State, Actions>['actions']; // action を受け取る

  private oldNode: VNode; // 古いノード、createElement に渡す際に新しいノードと比較して差分検知を行う
  private newNode: VNode; // 新しいノード、更新後のノードが来る
  private isSkipRender: boolean; // 飛ばすか否かの値

  constructor(params: TreactConstructor<State, Actions>) {
    this.el = typeof params.el === 'string' ? document.getElementById(params.el) : params.el;
    this.component = params.component;
    this.state = params.state;
    this.actions = this.dispatch(params.actions);
    this.rerender();
  };

  private debug() {
    console.log('')
    console.log('--------------- update dom ---------------')
    console.log('')
    console.log(`el:           ${JSON.stringify(this.el)}`);
    console.log(`component:    ${this.component}`);
    console.log(`state:        ${JSON.stringify(this.state)}`);
    console.log(`actions:      ${JSON.stringify(this.actions)}`);
    console.log(`oldNode:      ${JSON.stringify(this.oldNode)}`);
    console.log(`newNode:      ${JSON.stringify(this.newNode)}`);
    console.log(`isSkipRender: ${JSON.stringify(this.isSkipRender)}`);
  }

  // hooks らしい何か、開発者が定義した action を使用して値を更新する
  private dispatch(actions: Actions): Actions {
    const dispatched: ActionTree<State> = {};
    for (const key in actions) {
      const action = actions[key];
      dispatched[key] = (state: State, ...data: any): any => {
        const ret = action(state, ...data);
        // 再レンダリングする
        this.rerender();
        return ret;
      }
    }
    return dispatched as Actions;
  }

  // 仮想DOM を更新して再レンダリングする
  private rerender(): void {
    this.newNode = this.component(this.state, this.actions);
    this.schedule();
  }

  // render を遅らせる、カッコよく言うとスケジューリング
  private schedule(): void {
    if (!this.isSkipRender) {
      this.isSkipRender = true;
      // 非同期で遅延させる
      setTimeout(this.render.bind(this));``
    }
  }

  // 実DOM に反映する
  private render(): void {
    // this.debug();
    if (this.oldNode) {
      // 差分
      updateElement(this.el as HTMLElement, this.oldNode, this.newNode);
    } else {
      this.el.appendChild(createElement(this.newNode));
    }

    // 反映後に更新する
    this.oldNode = this.newNode;
    this.isSkipRender = false;
  }
}
  