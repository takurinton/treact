// src/treact/create-element.ts
function isVNode(node) {
  return typeof node !== "string" && typeof node !== "number";
}
function isEventAttr(attr) {
  return /^on/.test(attr);
}
function setAttributes(target, attrs) {
  for (let attr in attrs) {
    if (isEventAttr(attr)) {
      const eventName = attr.slice(2);
      target.addEventListener(eventName, attrs[attr]);
    } else {
      target.setAttribute(attr, attrs[attr]);
    }
  }
}
function h(nodeName, props, ...children) {
  let oldNode;
  return createVNode(nodeName, props, oldNode, children);
}
function createVNode(nodeName, props, oldNode = null, children) {
  return { nodeName, props, oldNode, children };
}
function createElement(node) {
  if (!isVNode(node)) {
    return document.createTextNode(node.toString());
  }
  console.log(node);
  const el = document.createElement(node.nodeName);
  setAttributes(el, node.props);
  node.children.forEach((child) => el.appendChild(createElement(child)));
  return el;
}

// src/treact/diff.ts
var ChangedType;
(function(ChangedType2) {
  ChangedType2[ChangedType2["None"] = 0] = "None";
  ChangedType2[ChangedType2["Type"] = 1] = "Type";
  ChangedType2[ChangedType2["Text"] = 2] = "Text";
  ChangedType2[ChangedType2["Node"] = 3] = "Node";
  ChangedType2[ChangedType2["Value"] = 4] = "Value";
  ChangedType2[ChangedType2["Attr"] = 5] = "Attr";
})(ChangedType || (ChangedType = {}));
function hasChanged(a, b) {
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
}
function updateAttributes(target, oldAttrs, newAttrs) {
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
}
function updateValue(target, newValue) {
  target.value = newValue;
}
function updateElement(parent, oldNode, newNode, index = 0) {
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
}

// src/treact/render.ts
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
  dispatch(actions2) {
    const dispatched = {};
    for (const key in actions2) {
      const action = actions2[key];
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
      ``;
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

// playground/todo/app.ts
var state = {
  tasks: [],
  form: {
    title: "",
    hasError: false
  }
};
var actions = {
  validate(state2, title) {
    if (!title || title.length < 3 || title.length > 20) {
      state2.form.hasError = true;
    } else {
      state2.form.hasError = false;
    }
    return !state2.form.hasError;
  },
  createTask(state2, title = "") {
    state2.tasks.push(title);
    state2.form.title = "";
  },
  removeTask(state2, index) {
    state2.tasks.splice(index, 1);
  }
};
var component = (state2, actions2) => {
  return h("div", {
    style: "padding: 2rem;"
  }, h("h1", {
    style: "margin-bottom: 2rem;"
  }, h("i", { class: "nes-icon heart is-medium" }), "treact todo app"), h("form", {
    style: "margin-bottom: 2rem;"
  }, h("div", {
    style: "margin-bottom: 1rem;"
  }, h("label", {
    for: "task-title"
  }, "Title: "), h("input", {
    type: "text",
    id: "task-title",
    value: state2.form.title,
    oninput: (ev) => {
      const target = ev.target;
      state2.form.title = target.value;
      actions2.validate(state2, target.value);
    }
  })), h("button", {
    type: "button",
    onclick: () => {
      if (state2.form.hasError)
        return;
      actions2.createTask(state2, state2.form.title);
    }
  }, "Create")), h("ul", {}, ...state2.tasks.map((task, i) => {
    return h("li", {
      style: "margin-bottom: 1rem;"
    }, task, h("button", {
      type: "button",
      style: "margin-left: 1rem;",
      onclick: () => actions2.removeTask(state2, i)
    }, "\xD7"));
  })));
};
new Treact({
  el: document.getElementById("takurinton"),
  state,
  component,
  actions
});
