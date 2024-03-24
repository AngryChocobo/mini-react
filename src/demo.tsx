/** @jsx R.createVNode */
import { R } from "./core/react.js";
const App = () => {
  const [msg, setMsg] = R.useState("Hello World and ");
  const [count, setCount] = R.useState(1);
  return (
    <div>
      <h1>{msg}Hello R!</h1>
      <button onclick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
};

function rerender() {
  // todo remove this ugly depenency
  window.stateCursor = 0;
  R.render(<App />, document.getElementById("app"));
}
(window as any).rerender = rerender;

const root = R.createRoot(document.getElementById("app"));
root.render(<App />);
