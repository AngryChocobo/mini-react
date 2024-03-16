import { React } from "./react.js";

const msg = "Hello World and ";
const App = (
  <div draggable>
    <h2 className="h2-hello"> {msg}Hello React!</h2>
    <p>I am a pargraph</p>
    <input type="text" />
  </div>
);
React.render(App, document.getElementById("app"));
