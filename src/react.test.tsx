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
    document.body.appendChild(appRoot);
    const msg = "Hello World and ";
    const App = (
      <div draggable>
        <h2 className="h2-hello">{msg}Hello React!</h2>
        <p>I am a pargraph</p>
        <input type="text" />
      </div>
    );
    React.render(App, appRoot);
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
    document.body.appendChild(appRoot);
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
    React.render(App, appRoot);
    console.log(document.body.innerHTML);
    const input = document.querySelector("input");
    expect(input.value).toBe("123");
  });
});
