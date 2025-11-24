
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import "./registerSW";
  import { makeServer } from "./mocks";

  // Initialize MirageJS server in development
  if (import.meta.env.DEV) {
    makeServer({ environment: 'development' });
  }

  createRoot(document.getElementById("root")!).render(<App />);
