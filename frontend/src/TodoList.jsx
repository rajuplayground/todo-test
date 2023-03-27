import { useState, useEffect } from "react";
import TodoAdd from "./components/TodoAdd";
import TodoItem from "./components/TodoItem";
import ReactModal from "react-modal";
import { X } from "react-feather";

function TodoList() {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);

  async function fetchTodoList() {
    const response = await fetch("http://localhost:4000/todos");
    const todoList = await response.json();
    setItems(todoList);
  }

  useEffect(() => {
    fetchTodoList();
  }, []);

  async function addItem(newItem, clearNewItem) {
    if (newItem.trim() === "") {
      return;
    }

    const response = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: newItem, status: "PENDING" }),
    });

    if (response.ok) {
      const newTodo = await response.json();
      setItems((prevItems) => [...prevItems, newTodo]);
      clearNewItem();
    }
  }

  async function toggleItemStatus(index) {
    const todo = items[index];
    const newStatus = todo.status === "PENDING" ? "DONE" : "PENDING";
    const updatedTodo = { ...todo, status: newStatus };

    const response = await fetch(`http://localhost:4000/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });

    if (response.ok) {
      const updatedTodoFromServer = await response.json();
      setItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[index] = updatedTodoFromServer;
        return newItems;
      });
    }
  }

  async function deleteItem(index) {
    const todo = items[index];

    const response = await fetch(`http://localhost:4000/todos/${todo.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    }
  }

  // async function editItem(index, newValue) {
  //   const todo = items[index];
  //   const updatedTodo = { ...todo, todo: newValue };

  //   const response = await fetch(`http://localhost:4000/todos/${todo.id}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(updatedTodo)
  //   });

  //   if (response.ok) {
  //     const updatedTodoFromServer = await response.json();
  //     setItems(prevItems => {
  //       const newItems = [...prevItems];
  //       newItems[index] = updatedTodoFromServer;
  //       return newItems;
  //     });
  //   }
  // }

  async function editItem(index) {
    const editTodo = items[index];
    setEditIndex(index);
    setUpdateItem(editTodo);
    setShowModal(true);
  }

  async function updateTodo(e) {
    e.preventDefault();
    const index = editIndex;

    const response = await fetch(
      `http://localhost:4000/todos/${updateItem.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateItem),
      }
    );

    if (response.ok) {
      const updatedTodoFromServer = await response.json();
      setItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[index] = updatedTodoFromServer;
        return newItems;
      });
    }
    closeModal();
  }

  const closeModal = () => {
    setEditIndex(-1);
    setUpdateItem(null);
    setShowModal(false);
  };

  return (
    <div className="container max-width-wrapper">
      <TodoAdd addItem={addItem} />
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
      {updateItem && (
        <ReactModal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Modal"
          className="dialogModal"
        >
          <div className="dialog">
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
            <button className="image-btn dialogClose" onClick={closeModal}>
              <X />
            </button>
          </div>
        </ReactModal>
      )}
    </div>
  );
}

export default TodoList;
