// src/vdomrinton/ui.ts
function createElement(nodeName, attributes, ...children) {
  return { nodeName, attributes, children };
}

// src/index.ts
var el = createElement("div", { id: "app", class: "main" }, createElement("p", { id: "name" }, "hello world!!"), createElement("input", {
  type: "button",
  id: "increment",
  onclick: () => {
    console.log("hello world");
  }
}, "click me!!"));
console.log(el);
