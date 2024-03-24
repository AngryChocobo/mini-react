/** @jsx R.createVNode */
import { R } from "./core/react.js";
const Todo = ({ todo, handleToggleTodoStatus }) => {
    const style = todo.finished ? "text-decoration: line-through" : "";
    return (R.createVNode("li", { style: style, onClick: () => handleToggleTodoStatus(todo.id) }, todo.content));
};
const TodoApp = () => {
    const [search, setSearch] = R.useState("");
    const [todos, setTodos] = R.useState([]);
    const addTodo = () => {
        if (search) {
            setTodos([
                ...todos,
                {
                    id: Math.random(),
                    content: search,
                    finished: false,
                },
            ]);
        }
    };
    const handleToggleTodoStatus = (id) => {
        const targetIndex = todos.findIndex((v) => v.id === id);
        if (targetIndex > -1) {
            const copy = [...todos];
            copy[targetIndex] = Object.assign(Object.assign({}, copy[targetIndex]), { finished: !copy[targetIndex].finished });
            setTodos(copy);
        }
    };
    return (R.createVNode("div", null,
        R.createVNode("div", null,
            R.createVNode("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value) }),
            R.createVNode("button", { onClick: addTodo }, "add")),
        R.createVNode("ul", { className: "todo-list" }, todos.map((v) => {
            return (R.createVNode(Todo, { todo: v, handleToggleTodoStatus: handleToggleTodoStatus }));
        }))));
};
function rerender() {
    // todo remove this ugly depenency
    window.stateCursor = 0;
    R.render(R.createVNode(TodoApp, null), document.getElementById("app"));
}
window.rerender = rerender;
const root = R.createRoot(document.getElementById("app"));
root.render(R.createVNode(TodoApp, null));
