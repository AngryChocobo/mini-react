import { lowercaseFirstLetter } from "../utils/index.js";

export type VNode = any;

const createVNode = (tag: string | Function, props: any, ...children: any) => {
  if (typeof tag === "function") {
    return tag(props, children);
  }
  const vnode: VNode = {
    tag,
    props,
    children,
  };
  return vnode;
};

const assignProps = (element: HTMLElement, vnode: VNode) => {
  if (vnode.props) {
    Object.keys(vnode.props)
      .filter((v) => !v.startsWith("on"))
      .forEach((prop) => {
        element[prop] = vnode.props[prop];
      });
  }
};
const assignEventListener = (element: HTMLElement, vnode: VNode) => {
  if (vnode.props) {
    Object.keys(vnode.props)
      .filter((v) => v.startsWith("on"))
      .forEach((prop) => {
        const eventName = lowercaseFirstLetter(prop.slice(2));
        element.addEventListener(eventName, vnode.props[prop]);
      });
  }
};

const render = (vnode: VNode, container: HTMLElement) => {
  // container.appendChild(el);
  if (typeof vnode === "string" || typeof vnode === "number") {
    const element = document.createTextNode(vnode + "");
    container.appendChild(element);
    return;
  }
  const element = document.createElement(vnode.tag);
  assignProps(element, vnode);
  assignEventListener(element, vnode);
  for (const child of vnode.children) {
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
    render: (vnode: VNode) => {
      R.render(vnode, container);
    },
  };
};

export const R = {
  createVNode,
  render,
  useState,
  createRoot,
};
