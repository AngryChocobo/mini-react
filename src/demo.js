/** @jsx R.createVNode */
import { R } from "./core/react.js";
const App = () => {
    const [msg, setMsg] = R.useState("Hello World and ");
    const [count, setCount] = R.useState(1);
    const [value, setValue] = R.useState("123");
    return (R.createVNode("div", { draggable: true },
        R.createVNode("h2", { className: "h2-hello" },
            msg,
            "Hello R!"),
        R.createVNode("p", null, "I am a pargraph"),
        R.createVNode("input", { type: "text", value: value, onchange: (e) => setValue(e.target.value) }),
        R.createVNode("button", { onclick: () => setCount(count + 1) }, count)));
};
function rerender() {
    // todo remove this ugly depenency
    window.stateCursor = 0;
    R.render(R.createVNode(App, null), document.getElementById("app"));
}
window.rerender = rerender;
const root = R.createRoot(document.getElementById("app"));
root.render(R.createVNode(App, null));
