import { useState, useEffect } from "react";
import {Edit, Trash, CheckCircle, Circle} from 'react-feather'
function TodoList() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [editIndex, setEditIndex] = useState('');

    async function fetchTodoList() {
      const response = await fetch('http://localhost:4000/todos');
      const todoList = await response.json();
      setItems(todoList);
    }

    useEffect(() => {
      fetchTodoList();
    }, []);

    async function addItem() {
      if (newItem.trim() === '') {
        return;
      }

      const response = await fetch('http://localhost:4000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: newItem, status: 'PENDING' })
      });

      if (response.ok) {
        const newTodo = await response.json();
        setItems(prevItems => [...prevItems, newTodo]);
        setNewItem('');
      }
    }

    async function toggleItemStatus(index) {
      const todo = items[index];
      const newStatus = todo.status === 'PENDING' ? 'DONE' : 'PENDING';
      const updatedTodo = { ...todo, status: newStatus };

      const response = await fetch(`http://localhost:4000/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo)
      });

      if (response.ok) {
        const updatedTodoFromServer = await response.json();
        setItems(prevItems => {
          const newItems = [...prevItems];
          newItems[index] = updatedTodoFromServer;
          return newItems;
        });
      }
    }

    async function deleteItem(index) {
      const todo = items[index];

      const response = await fetch(`http://localhost:4000/todos/${todo.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
      }
    }

    async function editItem(index, newValue) {
      const todo = items[index];
      const updatedTodo = { ...todo, todo: newValue };

      const response = await fetch(`http://localhost:4000/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo)
      });

      if (response.ok) {
        const updatedTodoFromServer = await response.json();
        setItems(prevItems => {
          const newItems = [...prevItems];
          newItems[index] = updatedTodoFromServer;
          return newItems;
        });
      }
    }
    return (
        <div className="container max-width-wrapper">
        <div className="todo__header">
            <h1 className="main-heading">Todo</h1>
            <div className="todo_input">
                <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="Add new item" />
                <button className="btn add" onClick={addItem}>Add</button>
            </div>
        </div>
        <div className="todo__items">
            <ul className="todo__list">
              {items.map((item, index) => (
                <li key={item.id} className={`todo__listitem ${item.status === 'DONE' ? 'todo__done' : ''}`}>
                  {item.editing ? (
                    <div className="todo__edit">
                      <input type="text" value={item.todo} onChange={e => updateTodoItem(e.target.value, index)} />
                      <button className="btn save" onClick={() => saveEditedItem(index)}>Save</button>
                    </div>
                  ) : (
                    <>
                    <button className="image-btn status" onClick={() => toggleItemStatus(index)}>{item.status === 'DONE' ? <CheckCircle /> : <Circle />}</button>
                      <span className="todo__title">{item.todo}</span>
                      <button className="image-btn edit" onClick={() => editItem(index)}><Edit /></button>
                      <button className="image-btn delete" onClick={() => deleteItem(index)}><Trash /></button>
                    </>
                  )}
                </li>
              ))}
            </ul>
        </div>
      </div>
    );
  }

  export default TodoList;
