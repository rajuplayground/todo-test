import TodoItem from "../TodoItem";

function TodoListItems({ items, toggleItemStatus, editItem, deleteItem }) {
  return (
    <div className="todo__items">
      <ul className="todo__list">
        {items.map((item, index) => (
          <TodoItem
            key={item.id}
            item={item}
            index={index}
            toggleItemStatus={toggleItemStatus}
            editItem={editItem}
            deleteItem={deleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoListItems;
