import "./App.css";
import TodoList from "../TodoList";
import Modal from "react-modal";
import { QueryClient, QueryClientProvider } from "react-query";
// Set the appElement to the root of your application
Modal.setAppElement("#root");
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  );
}

export default App;
