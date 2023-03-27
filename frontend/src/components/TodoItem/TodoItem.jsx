import { Edit, Trash, CheckCircle, Circle } from "react-feather";

function TodoItem({ item, index, toggleItemStatus, editItem, deleteItem }) {
  return (
    <li
      className={`todo__listitem ${item.status === "DONE" ? "todo__done" : ""}`}
    >
      <button
        className="image-btn status"
        onClick={() => toggleItemStatus(index)}
      >
        {item.status === "DONE" ? <CheckCircle /> : <Circle />}
      </button>
      <span
        className="todo__title"
        onClick={() => {
          item.status === "DONE" ? null : editItem(index);
        }}
      >
        {item.todo}
      </span>
      <button className="image-btn delete" onClick={() => deleteItem(index)}>
        <Trash />
      </button>
    </li>
  );
}

export default TodoItem;
