/** @jsx R.createVNode */
import { R } from "./core/react.js";
const App = () => {
  const [msg, setMsg] = R.useState("Hello World and ");
  const [count, setCount] = R.useState(1);
  const [value, setValue] = R.useState("123");
  return (
    <div draggable>
      <h2 className="h2-hello">{msg}Hello R!</h2>
      <p>I am a pargraph</p>
      <input
        type="text"
        value={value}
        onchange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={() => {
          console.log("clicked");
        }}
      >
        点我
      </button>
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
