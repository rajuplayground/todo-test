import { useState } from "react";
import styled from "styled-components";
import { Button, Input } from "../uicomponents";

function TodoAdd({ addItem }) {
  const [newItem, setNewItem] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(newItem, clearNewItem);
  };

  const clearNewItem = () => {
    setNewItem("");
  };
  return (
    <div className="bg-white rounded-lg p-4 pb-6">
      <h1 className="font-bold text-2xl my-3">Todo</h1>
      <form className="flex gap-4" onSubmit={handleAdd}>
        <AddInput
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
        />
        <AddButton type="submit">Add</AddButton>
      </form>
    </div>
  );
}

const AddButton = styled(Button)`
  --bg-color: cadetblue;
`;

const AddInput = styled(Input)``;

export default TodoAdd;
