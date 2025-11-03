// main.jsx
import "@fontsource/playfair-display";   // For headings
import "@fontsource/source-sans-pro";    // For body text
import "@fontsource/lato";               // Optional secondary text font

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // Ensure Tailwind + custom CSS is loaded

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
