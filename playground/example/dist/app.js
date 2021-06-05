var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// ../../index.js
var require_vdomrinton = __commonJS({
  "../../index.js"(exports2) {
    var __defProp2 = Object.defineProperty;
    var __markAsModule2 = (target) => __defProp2(target, "__esModule", { value: true });
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    __markAsModule2(exports2);
    __export(exports2, {
      Treact: () => Treact,
      createElement: () => createElement,
      createVNode: () => createVNode,
      h: () => h2,
      render: () => render2
    });
    var isVNode = (node) => typeof node !== "string" && typeof node !== "number";
    var isEventAttr = (attr) => /^on/.test(attr);
    var setAttributes = (target, attrs) => {
      for (let attr in attrs) {
        if (isEventAttr(attr)) {
          const eventName = attr.slice(2);
          target.addEventListener(eventName, attrs[attr]);
        } else {
          target.setAttribute(attr, attrs[attr]);
        }
      }
    };
    var h2 = (nodeName, props, ...children) => createVNode(nodeName, props, children, null, null);
    var createVNode = (nodeName, props, children, oldNode, newNode) => ({ nodeName, props, children, oldNode, newNode });
    var createElement = (node) => {
      if (!isVNode(node)) {
        return document.createTextNode(node.toString());
      }
      const el = document.createElement(node.nodeName);
      setAttributes(el, node.props);
      node.children.forEach((child) => el.appendChild(createElement(child)));
      return el;
    };
    var ChangedType;
    (function(ChangedType2) {
      ChangedType2[ChangedType2["None"] = 0] = "None";
      ChangedType2[ChangedType2["Type"] = 1] = "Type";
      ChangedType2[ChangedType2["Text"] = 2] = "Text";
      ChangedType2[ChangedType2["Node"] = 3] = "Node";
      ChangedType2[ChangedType2["Value"] = 4] = "Value";
      ChangedType2[ChangedType2["Attr"] = 5] = "Attr";
    })(ChangedType || (ChangedType = {}));
    var hasChanged = (a, b) => {
      if (typeof a !== typeof b)
        return 1;
      if (!isVNode(a) && a !== b)
        return 2;
      if (isVNode(a) && isVNode(b)) {
        if (a.nodeName !== b.nodeName)
          return 3;
        if (a.props.value !== b.props.value)
          return 4;
        if (JSON.stringify(a.props) !== JSON.stringify(b.props))
          return 5;
      }
      return 0;
    };
    var updateAttributes = (target, oldAttrs, newAttrs) => {
      for (let attr in oldAttrs) {
        if (!isEventAttr(attr)) {
          target.removeAttribute(attr);
        }
      }
      for (let attr in newAttrs) {
        if (!isEventAttr(attr)) {
          target.setAttribute(attr, newAttrs[attr]);
        }
      }
    };
    var updateValue = (target, newValue) => {
      target.value = newValue;
    };
    var updateElement = (parent, oldNode, newNode, index = 0) => {
      if (!oldNode) {
        parent.appendChild(createElement(newNode));
        return;
      }
      const target = parent.childNodes[index];
      if (!newNode) {
        parent.removeChild(target);
        return;
      }
      const changeType = hasChanged(oldNode, newNode);
      switch (changeType) {
        case 1:
        case 2:
        case 3:
          parent.replaceChild(createElement(newNode), target);
          return;
        case 4:
          updateValue(target, newNode.props.value);
          return;
        case 5:
          updateAttributes(target, oldNode.props, newNode.props);
          return;
      }
      if (isVNode(oldNode) && isVNode(newNode)) {
        for (let i = 0; i < newNode.children.length || i < oldNode.children.length; i++) {
          updateElement(target, oldNode.children[i], newNode.children[i], i);
        }
      }
    };
    var Treact = class {
      constructor(params) {
        this.el = typeof params.el === "string" ? document.getElementById(params.el) : params.el;
        this.component = params.component;
        this.state = params.state;
        this.actions = this.dispatch(params.actions);
        this.rerender();
      }
      debug() {
        console.log("");
        console.log("--------------- update dom ---------------");
        console.log("");
        console.log(`el:           ${JSON.stringify(this.el)}`);
        console.log(`component:    ${this.component}`);
        console.log(`state:        ${JSON.stringify(this.state)}`);
        console.log(`actions:      ${JSON.stringify(this.actions)}`);
        console.log(`oldNode:      ${JSON.stringify(this.oldNode)}`);
        console.log(`newNode:      ${JSON.stringify(this.newNode)}`);
        console.log(`isSkipRender: ${JSON.stringify(this.isSkipRender)}`);
      }
      dispatch(actions) {
        const dispatched = {};
        for (const key in actions) {
          const action = actions[key];
          dispatched[key] = (state2, ...data) => {
            const ret = action(state2, ...data);
            this.rerender();
            return ret;
          };
        }
        return dispatched;
      }
      rerender() {
        this.newNode = this.component(this.state, this.actions);
        this.schedule();
      }
      schedule() {
        if (!this.isSkipRender) {
          this.isSkipRender = true;
          setTimeout(this.render.bind(this));
        }
      }
      render() {
        if (this.oldNode) {
          updateElement(this.el, this.oldNode, this.newNode);
        } else {
          this.el.appendChild(createElement(this.newNode));
        }
        this.oldNode = this.newNode;
        this.isSkipRender = false;
      }
    };
    var render2 = (vnode2, parent, state2) => {
      let oldNode, newNode;
      if (oldNode) {
        updateElement(parent, oldNode, newNode);
      } else {
        newNode = vnode2;
        parent.appendChild(createElement(newNode));
      }
      oldNode = newNode;
      console.log(oldNode);
    };
  }
});

// app.ts
var import_treact = __toModule(require_vdomrinton());
var handleClick = () => {
  state.members.push("takuriton");
};
var state = {
  members: ["hoge"]
};
var vnode = (0, import_treact.h)("div", {}, (0, import_treact.h)("button", { onclick: handleClick }, "button"), (0, import_treact.h)("ul", {}, ...state.members.map((member) => (0, import_treact.h)("li", {}, member))));
var element = document.getElementById("takurinton");
(0, import_treact.render)(vnode, element, state);
