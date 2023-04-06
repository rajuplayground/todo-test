import TodoItem from "../TodoItem";

function TodoListItems({ items, toggleItemStatus, editItem, deleteItem }) {
  return (
    <div className="mt-12">
      <ul className="flex flex-col gap-4">
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
