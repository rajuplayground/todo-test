import { Edit, Trash, CheckCircle, Circle } from "react-feather";
import styled from "styled-components";
import { ImageButton } from "../uicomponents";

function TodoItem({ item, index, toggleItemStatus, editItem, deleteItem }) {
  return (
    <li className={`bg-white flex p-[25px] rounded-md align-middle gap-4`}>
      <CheckButton onClick={() => toggleItemStatus(item)}>
        {item.status === "DONE" ? <CheckCircle /> : <Circle />}
      </CheckButton>
      <Title
        onClick={() => {
          item.status === "DONE" ? null : editItem(item);
        }}
        item={item}
      >
        {item.todo}
      </Title>
      <TrashButton onClick={() => deleteItem(item)}>
        <Trash />
      </TrashButton>
    </li>
  );
}

const CheckButton = styled(ImageButton)`
  --icon-color: darkseagreen;
`;

const TrashButton = styled(ImageButton)`
  --icon-color: crimson;
`;

const Title = styled.span`
  text-decoration: ${(props) =>
    props.item.status === "DONE" ? "line-through" : "none"};
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export default TodoItem;
