import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./global.css";
import GlobalStyles from "./components/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <div>
      <h1>hellow</h1>
    </div> */}
    <App />
    <GlobalStyles />
  </React.StrictMode>
);
