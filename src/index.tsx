const createElement = (tag: string | Function, props: any, children: any) => {
  if (typeof tag === "function") {
    return tag(props, children);
  }
  const el = {
    tag,
    props,
    children,
  };
  // console.log(type, props, children);
  console.log(el);
  return el;
};
const render = (el: any, container: HTMLElement) => {
  // container.appendChild(el);
};
const React = {
  createElement,
  render,
};
const App = (
  <div draggable>
    <h2>Hello React!</h2>
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
