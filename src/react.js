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
    if (typeof el === "string") {
        const element = document.createTextNode(el);
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
function useState(initialState) {
    let state = initialState;
    console.log("initialState is :", initialState);
    const setState = (newState) => {
        console.log("new State is: ", newState);
        state = newState;
    };
    return [state, setState];
}
export const React = {
    createElement,
    render,
    useState,
};
