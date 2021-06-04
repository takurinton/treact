# 自作仮想DOM

## 概要

vdom を実装した。　

## とりあえず動かしたい人

VSCode の Go Live プラグインを使用すると便利です。  

```bash
git clone https://github.com/takurinton/treact
cd treact
npm i 
npm run build
```

Go Live でライブサーバを起動する  
  
- [example](http://localhost:5500/playground/example)
- [todo app](http://localhost:5500/playground/todo)  


## 使い方 

```bash
npm run build
open /your/path/index.html
```

### class を使用する場合

```ts
import { h, Treact, Component, ActionTree } from 'treact';

// お好みの state を追加する
type State = {}
const state: State = {}

// お好みの関数を追加する
interface Actions extends ActionTree<State> {}
const actions: Actions = {}

const component: Component<State, Actions> = (state, actions) => {
  return h(
    'div', {}, h(
      'h1', {}, 'hello world'
    )
  ); 
}

new Treact<State, Actions>({
  el: document.getElementById('main'),
  state,
  component,
  actions
})
```

```html
<!-- index.html -->
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hello world</title>
</head>
<body>
    <div id="main"></div>
    <script async defer src="./main.js"></script>
</body>
</html>
```

### 関数を使用する場合（未実装）

関数は hooks が未実装なので実験的な段階です。  
レンダリングして表示することはできますが状態管理などはできません。(2021年6月4日時点)

```ts
// main.ts
import { h, render } from 'treact';

const vnode = h(
  'div', {}, h(
    'h1', {}, 'hello world'
  )
);

const element = document.getElementById('main');
render(vnode, element, state);
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hello world</title>
</head>
<body>
    <div id="main"></div>
    <script async defer src="./main.js"></script>
</body>
</html>
```


## TODO
- [ ] hooks 実装したい
  - ここらへんを参考にする
  - [haunted](https://github.com/matthewp/haunted) 
  - [preact](https://github.com/preactjs/preact/)
- [ ] 差分検知の部分を見直す
- [ ] rapida を突っ込む
  - これは rapida 側の進捗による
  - 出来次第やる
