function TodoUpdate({ updateItem, updateTodo, setUpdateItem }) {
  return (
    <>
      <h2 className="dialog-heading">Update Todo</h2>
      <form className="todo_input" onSubmit={updateTodo}>
        <input
          type="text"
          value={updateItem.todo}
          onChange={(e) =>
            setUpdateItem((val) => {
              return { ...val, todo: e.target.value };
            })
          }
          placeholder="Add new item"
        />
        <button type="submit" className="btn add">
          Update
        </button>
      </form>
    </>
  );
}

export default TodoUpdate;
