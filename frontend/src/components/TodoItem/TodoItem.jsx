import { Edit, Trash, CheckCircle, Circle } from "react-feather";

function TodoItem({ item, index, toggleItemStatus, editItem, deleteItem }) {
  return (
    <li
      className={`todo__listitem ${item.status === "DONE" ? "todo__done" : ""}`}
    >
      <button
        className="image-btn status"
        onClick={() => toggleItemStatus(item)}
      >
        {item.status === "DONE" ? <CheckCircle /> : <Circle />}
      </button>
      <span
        className="todo__title"
        onClick={() => {
          item.status === "DONE" ? null : editItem(item);
        }}
      >
        {item.todo}
      </span>
      <button className="image-btn delete" onClick={() => deleteItem(item)}>
        <Trash />
      </button>
    </li>
  );
}

export default TodoItem;
