import { useState, useEffect } from "react";
import TodoAdd from "../TodoAdd";
import ReactModal from "react-modal";
import TodoListItems from "../TodoListItems";
import TodoUpdate from "../TodoUpdate";
import DialogWrapper from "../DialogWrapper";
import { useMutation, useQuery, useQueryClient } from "react-query";

function TodoList() {
  const [showModal, setShowModal] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);

  const queryClient = useQueryClient();

  const getTodos = async () => {
    const response = await fetch("http://localhost:4000/todos");
    const todos = response.json();
    return todos;
  };

  const addTodo = async (todo) => {
    const response = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    const data = response.json();
    return data;
  };

  const updateTodo = async (todo) => {
    const response = await fetch(`http://localhost:4000/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    const data = response.json();
    return data;
  };

  const deleteTodo = async (todo) => {
    const response = await fetch(`http://localhost:4000/todos/${todo.id}`, {
      method: "DELETE",
    });
    const data = response.json();
    return data;
  };

  const { isLoading, error, data: items } = useQuery("todos", getTodos);
  const { mutate: addMutate } = useMutation(addTodo);
  const { mutate: updateMutate } = useMutation(updateTodo);
  const { mutate: deleteMutate } = useMutation(deleteTodo);

  async function addItem(newItem, clearNewItem) {
    if (newItem.trim() === "") {
      return;
    }

    await addMutate(
      { todo: newItem, status: "PENDING" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("todos");
          clearNewItem();
        },
      }
    );
  }

  async function toggleItemStatus(todo) {
    const newStatus = todo.status === "PENDING" ? "DONE" : "PENDING";
    const modifiedTodo = { ...todo, status: newStatus };

    await updateMutate(modifiedTodo, {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    });
  }

  async function editItem(item) {
    setUpdateItem(item);
    setShowModal(true);
  }

  async function modifyTodo(e) {
    e.preventDefault();

    if (updateItem.todo.trim() === "") {
      return;
    }

    await updateMutate(updateItem, {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
        closeModal();
      },
    });
  }

  async function deleteItem(todo) {
    await deleteMutate(todo, {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    });
  }

  const closeModal = () => {
    setUpdateItem(null);
    setShowModal(false);
  };

  console.log(items);

  return (
    <div className="container max-width-wrapper">
      <TodoAdd addItem={addItem} />
      {items && (
        <TodoListItems
          items={items}
          toggleItemStatus={toggleItemStatus}
          editItem={editItem}
          deleteItem={deleteItem}
        />
      )}
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
              updateTodo={modifyTodo}
              setUpdateItem={setUpdateItem}
            />
          </DialogWrapper>
        </ReactModal>
      )}
    </div>
  );
}

export default TodoList;
