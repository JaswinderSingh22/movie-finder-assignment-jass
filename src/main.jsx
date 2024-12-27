import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MovieProvider } from "./context/MovieContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MovieProvider>
      <App />
    </MovieProvider>
  </React.StrictMode>
);