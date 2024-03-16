const createElement = (tag, props, ...children) => {
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
const render = (el, container) => {
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
const msg = "Hello World and ";
const App = (React.createElement("div", { draggable: true },
    React.createElement("h2", { className: "h2-hello" },
        " ",
        msg,
        "Hello React!"),
    React.createElement("p", null, "I am a pargraph"),
    React.createElement("input", { type: "text" })));
const Wrapper = () => {
    return (React.createElement("div", { className: "wrapper" },
        React.createElement("div", { className: "content" }, "123")));
};
console.log(React.createElement(Wrapper, null));
React.render(App, document.getElementById("app"));
// const App = React.createElement("div", null, "Hello jsx!");
