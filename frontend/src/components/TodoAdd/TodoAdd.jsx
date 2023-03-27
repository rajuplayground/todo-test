import { useState } from "react";

function TodoAdd({addItem}){
    const [newItem, setNewItem] = useState('');

    const handleAdd = (e)=>{
        e.preventDefault()
        addItem(newItem, clearNewItem)
    }

    const clearNewItem = ()=>{
        setNewItem('');
    }
    return(
        <div className="todo__header">
            <h1 className="main-heading">Todo</h1>
            <form className="todo_input" onSubmit={handleAdd}>
                <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="Add new item" />
                <button type="submit" className="btn add">Add</button>
            </form>
        </div>
    );
}

export default TodoAdd;
