const createElement = (tag, props, children) => {
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
const render = (el, container) => {
    // container.appendChild(el);
};
const React = {
    createElement,
    render,
};
const App = (React.createElement("div", { draggable: true },
    React.createElement("h2", null, "Hello React!"),
    React.createElement("p", null, "I am a pargraph"),
    React.createElement("input", { type: "text" })));
const Wrapper = () => {
    return (React.createElement("div", { className: "wrapper" },
        React.createElement("div", { className: "content" }, "123")));
};
console.log(React.createElement(Wrapper, null));
React.render(App, document.getElementById("app"));
// const App = React.createElement("div", null, "Hello jsx!");
