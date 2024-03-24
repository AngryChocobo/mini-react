import { React } from "./core/react.js";
const App = () => {
  const [msg, setMsg] = React.useState("Hello World and ");
  const [count, setCount] = React.useState(1);
  const [value, setValue] = React.useState("123");
  return (
    <div draggable>
      <h2 className="h2-hello">{msg}Hello React!</h2>
      <p>I am a pargraph</p>
      <input
        type="text"
        value={value}
        onchange={(e) => setValue(e.target.value)}
      />
      <button onclick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
};

function rerender() {
  // todo remove this ugly depenency
  window.stateCursor = 0;
  React.render(<App />, document.getElementById("app"));
}
(window as any).rerender = rerender;
(window as any).rerender();
