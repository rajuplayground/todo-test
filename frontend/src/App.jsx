import "./App.css";
import TodoList from "./TodoList";

import Modal from "react-modal";

// Set the appElement to the root of your application
Modal.setAppElement("#root");

function App() {
  return <TodoList />;
}

export default App;
