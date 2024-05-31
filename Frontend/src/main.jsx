import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { VotingProvider } from "./context/VotingContex.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <VotingProvider>
        <App />
      </VotingProvider>
    </AuthProvider>
  </BrowserRouter>
);
