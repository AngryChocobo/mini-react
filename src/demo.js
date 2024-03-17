import { React } from "./react.js";
const App = () => {
    const [msg, setMsg] = React.useState("Hello World and ");
    const [count, setCount] = React.useState(1);
    const [value, setValue] = React.useState("123");
    return (React.createElement("div", { draggable: true },
        React.createElement("h2", { className: "h2-hello" },
            msg,
            "Hello React!"),
        React.createElement("p", null, "I am a pargraph"),
        React.createElement("input", { type: "text", value: value, onchange: (e) => setValue(e.target.value) }),
        React.createElement("button", { onclick: () => setCount(count + 1) }, count)));
};
function rerender() {
    // todo remove this ugly depenency
    window.stateCursor = 0;
    React.render(React.createElement(App, null), document.getElementById("app"));
}
window.rerender = rerender;
window.rerender();
