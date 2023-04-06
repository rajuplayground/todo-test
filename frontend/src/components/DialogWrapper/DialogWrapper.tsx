import { X } from "react-feather";
import styled from "styled-components";
import { ImageButton } from "../uicomponents";

function DialogWrapper({ children, closeModal }) {
  return (
    <Wrapper>
      {children}
      <CloseButton onClick={closeModal}>
        <X />
      </CloseButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: white;
  padding: 32px;
  border-radius: 5px;
  position: relative;
`;

const CloseButton = styled(ImageButton)`
  --icon-color: black;
  position: absolute;
  top: 15px;
  right: 15px;
`;

export default DialogWrapper;
