import styled from "styled-components";
import { Button, Input } from "../uicomponents";

function TodoUpdate({ updateItem, updateTodo, setUpdateItem }) {
  return (
    <>
      <h2 className="font-bold text-2xl my-3">Update Todo</h2>
      <form className="flex gap-4" onSubmit={updateTodo}>
        <UpdateInput
          type="text"
          value={updateItem.todo}
          onChange={(e) =>
            setUpdateItem((val) => {
              return { ...val, todo: e.target.value };
            })
          }
          placeholder="Add new item"
        />
        <UpdateButton type="submit">Update</UpdateButton>
      </form>
    </>
  );
}

const UpdateButton = styled(Button)`
  --bg-color: cadetblue;
`;

const UpdateInput = styled(Input)``;

export default TodoUpdate;
