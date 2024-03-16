import { React } from "./react.js";
const msg = "Hello World and ";
const [value, setValue] = React.useState("123");
const App = (React.createElement("div", { draggable: true },
    React.createElement("h2", { className: "h2-hello" },
        msg,
        "Hello React!"),
    React.createElement("p", null, "I am a pargraph"),
    React.createElement("input", { type: "text", value: value, onchange: (e) => setValue(e.target.value) })));
React.render(App, document.getElementById("app"));
