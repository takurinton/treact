// src/vdomrinton/ui.ts
function createVNode(nodeName, attributes, ...children) {
  return { nodeName, attributes, children };
}

// src/index.ts
var el = createVNode("div", { id: "app", class: "main" }, createVNode("p", { id: "name" }, "hello world!!"), createVNode("input", {
  type: "button",
  id: "increment",
  onclick: () => {
    console.log("hello world");
  }
}, "click me!!"));
console.log(el);
