// @vitest-environment jsdom
/** @jsx R.createVNode */
/// <reference types="../global.d.ts" />
import { expect, test, describe, vi, beforeEach } from "vitest";
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
        <h1 className="h1-hello">{msg}Hello R!</h1>
        <p>I am a pargraph</p>
      </div>
    );
    function rerender() {
      // todo remove this ugly depenency
      window.stateCursor = 0;
      R.render(<App />, document.getElementById("app"));
    }
    window.rerender = rerender;
    const root = R.createRoot(document.getElementById("app"));
    root.render(<App />);
    expect(
      document
        .querySelector(".h1-hello")
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
    window.rerender = rerender;
    const root = R.createRoot(document.getElementById("app"));
    root.render(<App />);

    const btnDom = document.querySelector("button");
    expect(mockFn).toBeCalledTimes(0);
    expect(btnDom).toBeTruthy();
    btnDom.click();
    expect(mockFn).toBeCalledTimes(1);
  });

  test("nested components", () => {
    const Foo = () => <div className="foo">foo</div>;
    const Bar = () => (
      <div className="bar">
        <Foo />
      </div>
    );

    const App = () => (
      <div id="wrapper">
        <Foo />
        <Bar />
      </div>
    );
    const root = R.createRoot(document.getElementById("app"));
    root.render(<App />);

    const wrapper = document.querySelector("#wrapper") as HTMLDivElement;
    expect(wrapper).toBeTruthy();
    const foo = wrapper.querySelector(".foo");
    expect(foo).toBeTruthy();
    expect(foo.textContent).toBe("foo");
    const bar = wrapper.querySelector(".bar");
    expect(bar).toBeTruthy();
    expect(bar.textContent).toBe("foo");
  });

  test("useState & props", () => {
    const Count = ({ count }) => <div className="count">{count}</div>;
    const App = () => {
      const [count, setCount] = R.useState(1);
      return (
        <div>
          <Count count={count} />
          <button onClick={() => setCount(count + 1)}>Add One</button>
        </div>
      );
    };

    function rerender() {
      // todo remove this ugly depenency
      window.stateCursor = 0;
      R.render(<App />, document.getElementById("app"));
    }
    window.rerender = rerender;
    const root = R.createRoot(document.getElementById("app"));
    root.render(<App />);
    const btn = document.querySelector("button");
    const count = document.querySelector(".count");
    expect(count.textContent).toBe("1");
    btn.click();
    const count2 = document.querySelector(".count");
    expect(count2.textContent).toBe("2");
  });
});
