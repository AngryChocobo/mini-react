// @vitest-environment jsdom
import { expect, test, describe, afterEach } from "vitest";
import { React } from "./react";

describe("react", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });
  test("Happy path", () => {
    expect(React).toBeTruthy();
    const appRoot = document.createElement("div");
    appRoot.id = "app";
    document.body.appendChild(appRoot);
    const msg = "Hello World and ";
    const App = () => (
      <div draggable>
        <h2 className="h2-hello">{msg}Hello React!</h2>
        <p>I am a pargraph</p>
        <input type="text" />
      </div>
    );
    function rerender() {
      // todo remove this ugly depenency
      window.stateCursor = 0;
      React.render(<App />, appRoot);
    }
    (window as any).rerender = rerender;
    (window as any).rerender();
    expect(document.body.querySelector("input").getAttribute("type")).toBe(
      "text"
    );
    expect(
      appRoot
        .querySelector(".h2-hello")
        .textContent.includes("Hello World and Hello React!")
    ).toBeTruthy();
  });

  test("useState", () => {
    const appRoot = document.createElement("div");
    appRoot.id = "app";
    document.body.appendChild(appRoot);

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
      React.render(<App />, appRoot);
    }
    (window as any).rerender = rerender;
    (window as any).rerender();
    // console.log(document.body.innerHTML);
    const input = document.querySelector("input");
    expect(input.value).toBe("123");

    const btn = document.querySelector("button");
    expect(btn.textContent).toBe("1");
    expect(
      document
        .querySelector(".h2-hello")
        .textContent.includes("Hello World and Hello React!")
    ).toBeTruthy();
    btn.click();
    const btn2 = document.querySelector("button");
    expect(btn2.textContent).toBe("2");
    expect(
      appRoot
        .querySelector(".h2-hello")
        .textContent.includes("Hello World and Hello React!")
    ).toBeTruthy();
  });
});
