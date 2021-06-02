# 自作仮想DOM

## やること

- 仮想DOMを作成する
- イベントやりたい
- hooks 実装したい

## 迷ってること

### バンドルに rapida を使うかどうか。  

rapida のネックな点
- TS に対応してない
- 単一ファイルしか対応できない（名前の解決ができない、ESM の構文についてはクリアするはず）
- バンドルサイズが大きくなりがち


## 構成

- src/
  - tests/
    - index.test.js (仮想DOM のテストを書いてる)
  - treact/
    - index.ts (エントリポイント)
    - create-element.ts (仮想DOM の生成・実DOM の生成)
    - diff.ts (差分検知、変更の余地あり)
    - render.ts (レンダリング、再レンダリング)


## フロー

1. `createVNode` 関数で仮想DOMを生成する
1. それをもとにして実DOMを生成する
1. 差分検知を行い状態管理をする


## TODO
- [ ] hooks 実装したい
  - ここらへんを参考にする
  - [haunted](https://github.com/matthewp/haunted) 
  - [preact](https://github.com/preactjs/preact/)
- [ ] 差分検知の部分を見直す
- [ ] JSX を使えるようにする
  - これは babel あたりでよしなにやりたい
  - rapida でも対応していきたい
