/** @jsx R.createVNode */
import { R } from "./core/react";
const Todo = ({ todo, handleToggleTodoStatus }) => {
  const style = todo.finished ? "text-decoration: line-through" : "";
  return (
    <li style={style} onClick={() => handleToggleTodoStatus(todo.id)}>
      {todo.content}
    </li>
  );
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
  const handleToggleTodoStatus = (id: number) => {
    const targetIndex = todos.findIndex((v) => v.id === id);
    if (targetIndex > -1) {
      const copy = [...todos];
      copy[targetIndex] = {
        ...copy[targetIndex],
        finished: !copy[targetIndex].finished,
      };
      setTodos(copy);
    }
  };
  return (
    <div>
      <p>提示：目前onchange需要input失焦以后再点击add按钮</p>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={addTodo}>add</button>
      </div>
      <ul className="todo-list">
        {todos.map((v) => {
          return (
            <Todo todo={v} handleToggleTodoStatus={handleToggleTodoStatus} />
          );
        })}
      </ul>
    </div>
  );
};

function rerender() {
  // todo remove this ugly depenency
  window.stateCursor = 0;
  R.render(<TodoApp />, document.getElementById("app"));
}
window.rerender = rerender;

const root = R.createRoot(document.getElementById("app"));
root.render(<TodoApp />);
