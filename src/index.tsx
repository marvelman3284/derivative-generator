import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Faq from "./components/faq"
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App/>} />
        <Route path="/faq" element={<Faq/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
