const createElement = (
  tag: string | Function,
  props: any,
  ...children: any
) => {
  if (typeof tag === "function") {
    return tag(props, children);
  }
  const el = {
    tag,
    props,
    children,
  };
  return el;
};
const render = (el: any, container: HTMLElement) => {
  // container.appendChild(el);
  if (typeof el === "string" || typeof el === "number") {
    const element = document.createTextNode(el + "");
    container.appendChild(element);
    return;
  }
  const element = document.createElement(el.tag);
  if (el.props) {
    Object.keys(el.props).forEach((prop) => {
      element[prop] = el.props[prop];
    });
  }
  for (const child of el.children) {
    render(child, element);
  }
  container.appendChild(element);
};

const globalStateArray = [];
window.stateCursor = 0;

function useState<T extends any>(initialState: T) {
  let currentStateCursor = window.stateCursor;
  globalStateArray[currentStateCursor] =
    globalStateArray[currentStateCursor] || initialState;
  console.log("initialState is :", globalStateArray[currentStateCursor]);
  const setState = (newState: T) => {
    console.log("new State is: ", newState);
    globalStateArray[currentStateCursor] = newState;
    document.getElementById("app").innerHTML = "";
    (window as any).rerender();
  };
  window.stateCursor++;
  return [globalStateArray[currentStateCursor], setState] as const;
}

const createRoot = (container: HTMLElement) => {
  return {
    render: (component: any) => {
      React.render(component, container);
    },
  };
};

export const React = {
  createElement,
  render,
  useState,
  createRoot,
};
