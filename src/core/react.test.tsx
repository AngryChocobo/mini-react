// @vitest-environment jsdom
/** @jsx R.createVNode */
/// <reference types="../global.d.ts" />
import { expect, test, describe, afterEach, vi, beforeEach } from "vitest";
import { R } from "./react";

describe("react", () => {
  beforeEach(() => {
    // makesure each test case have a root container dom
    document.body.innerHTML = "<div id='app'></div>";
  });
  test("Happy path", () => {
    expect(R).toBeTruthy();
    const msg = "Hello World and ";
    const App = () => (
      <div draggable>
        <h2 className="h2-hello">{msg}Hello R!</h2>
        <p>I am a pargraph</p>
        <input type="text" />
      </div>
    );
    function rerender() {
      // todo remove this ugly depenency
      window.stateCursor = 0;
      R.render(<App />, document.getElementById("app"));
    }
    (window as any).rerender = rerender;
    const root = R.createRoot(document.getElementById("app"));
    root.render(<App />);
    expect(document.querySelector("input").getAttribute("type")).toBe("text");
    expect(
      document
        .querySelector(".h2-hello")
        .textContent.includes("Hello World and Hello R!")
    ).toBeTruthy();
  });

  test("should create a text vnode", () => {
    const vnode = R.createVNode("h1", {}, "hi");
    expect(vnode.tag).toEqual("h1");
  });

  test("should bind event listener", () => {
    const mockFn = vi.fn();
    const App = () => <button onClick={mockFn}></button>;
    function rerender() {
      // todo remove this ugly depenency
      window.stateCursor = 0;
      R.render(<App />, document.getElementById("app"));
    }
    (window as any).rerender = rerender;
    const root = R.createRoot(document.getElementById("app"));
    root.render(<App />);

    const btnDom = document.querySelector("button");
    expect(mockFn).toBeCalledTimes(0);
    expect(btnDom).toBeTruthy();
    btnDom.click();
    expect(mockFn).toBeCalledTimes(1);
  });

  test("useState", () => {
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
    const input = document.querySelector("input");
    expect(input.value).toBe("123");

    const btn = document.querySelector("button");
    expect(btn.textContent).toBe("1");
    expect(
      document
        .querySelector(".h2-hello")
        .textContent.includes("Hello World and Hello R!")
    ).toBeTruthy();
    btn.click();
    const btn2 = document.querySelector("button");
    expect(btn2.textContent).toBe("2");
    expect(
      document
        .querySelector(".h2-hello")
        .textContent.includes("Hello World and Hello R!")
    ).toBeTruthy();
  });
});
