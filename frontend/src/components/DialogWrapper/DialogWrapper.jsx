import { X } from "react-feather";

function DialogWrapper({ children, closeModal }) {
  return (
    <div className="dialog">
      {children}
      <button className="image-btn dialogClose" onClick={closeModal}>
        <X />
      </button>
    </div>
  );
}

export default DialogWrapper;
