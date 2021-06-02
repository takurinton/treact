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
function createVNode(nodeName, attributes, ...children) {
  const vnode = { nodeName, attributes, children };
  return vnode;
}
function createElement(node) {
  if (!isVNode(node)) {
    return document.createTextNode(node.toString());
  }
  const el = document.createElement(node.nodeName);
  setAttributes(el, node.attributes);
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

// src/treact/render.ts
function render(vnode, target, replaceNode = void 0) {
  if (false) {
    updateElement(target, vnode, vnode);
  } else {
    return target.appendChild(createElement(vnode));
  }
}

// src/index.ts
var vdom = createVNode("div", { id: "app", class: "main" }, createVNode("h1", { id: "name" }, "hello world!!"), createVNode("button", {
  id: "increment",
  onclick: () => {
    console.log("hello world");
  }
}, "click me!!"));
var app = document.getElementById("app");
render(vdom, app);
