import { React } from "./react.js";

const msg = "Hello World and ";
const [value, setValue] = React.useState("123");
const App = (
  <div draggable>
    <h2 className="h2-hello">{msg}Hello React!</h2>
    <p>I am a pargraph</p>
    <input
      type="text"
      value={value}
      onchange={(e) => setValue(e.target.value)}
    />
  </div>
);
React.render(App, document.getElementById("app"));
