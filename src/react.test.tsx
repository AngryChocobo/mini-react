// @vitest-environment jsdom
import { expect, test } from "vitest";
import { React } from "./react";

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

function incrementCounter() {
  const counter = document.getElementById("counter");
  if (counter) {
    const currentValue = parseInt(counter.textContent, 10);
    counter.textContent = (currentValue + 1).toString();
  }
}

test("incrementCounter should increment the counter", () => {
  document.body.innerHTML = '<div id="counter">0</div>';
  incrementCounter();
  const counter = document.getElementById("counter");
  expect(counter?.textContent).toBe("1");
});
