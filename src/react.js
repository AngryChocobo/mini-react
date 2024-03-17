const createElement = (tag, props, ...children) => {
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
const render = (el, container) => {
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
function useState(initialState) {
    let currentStateCursor = window.stateCursor;
    globalStateArray[currentStateCursor] =
        globalStateArray[currentStateCursor] || initialState;
    console.log("initialState is :", globalStateArray[currentStateCursor]);
    const setState = (newState) => {
        console.log("new State is: ", newState);
        globalStateArray[currentStateCursor] = newState;
        document.getElementById("app").innerHTML = "";
        window.rerender();
    };
    window.stateCursor++;
    return [globalStateArray[currentStateCursor], setState];
}
export const React = {
    createElement,
    render,
    useState,
};
