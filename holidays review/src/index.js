import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeServer } from "./mockserver";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

if (process.env.NODE_ENV === "development") {
  makeServer();
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
