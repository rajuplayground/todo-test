import { useState, useEffect } from "react";
import TodoAdd from "../TodoAdd";
import ReactModal from "react-modal";
import TodoListItems from "../TodoListItems";
import TodoUpdate from "../TodoUpdate";
import DialogWrapper from "../DialogWrapper";

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

  async function editItem(index) {
    const editTodo = items[index];
    setEditIndex(index);
    setUpdateItem(editTodo);
    setShowModal(true);
  }

  async function updateTodo(e) {
    e.preventDefault();
    if (updateItem.todo.trim() === "") {
      return;
    }

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
      <TodoListItems
        items={items}
        toggleItemStatus={toggleItemStatus}
        editItem={editItem}
        deleteItem={deleteItem}
      />
      {updateItem && (
        <ReactModal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Modal"
          className="dialogModal"
        >
          <DialogWrapper closeModal={closeModal}>
            <TodoUpdate
              updateItem={updateItem}
              updateTodo={updateTodo}
              setUpdateItem={setUpdateItem}
            />
          </DialogWrapper>
        </ReactModal>
      )}
    </div>
  );
}

export default TodoList;
