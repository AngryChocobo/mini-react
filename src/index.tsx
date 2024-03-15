const createElement = (
  tag: string | Function,
  props: any,
  ...children: any
) => {
  if (typeof tag === "function") {
    return tag(props, children);
  }
  const el = {
    tag,
    props,
    children,
  };
  return el;
};
const render = (el: any, container: HTMLElement) => {
  // container.appendChild(el);
  if (typeof el === "string") {
    const element = document.createTextNode(el);
    container.appendChild(element);
    return;
  }
  const element = document.createElement(el.tag);
  if (el.props) {
    Object.keys(el.props).forEach((prop) => {
      element[prop] = el.props[prop];
    });
  }
  for (const child of el.children) {
    render(child, element);
  }
  container.appendChild(element);
};
const React = {
  createElement,
  render,
};
const App = (
  <div draggable>
    <h2 className="h2-hello">Hello React!</h2>
    <p>I am a pargraph</p>
    <input type="text" />
  </div>
);
const Wrapper = () => {
  return (
    <div className="wrapper">
      <div className="content">123</div>
    </div>
  );
};

console.log(<Wrapper />);
React.render(App, document.getElementById("app"));

// const App = React.createElement("div", null, "Hello jsx!");
