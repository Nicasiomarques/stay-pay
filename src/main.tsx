
  import { createRoot } from "react-dom/client";
  import { QueryClientProvider } from "@tanstack/react-query";
  import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
  import App from "./App.tsx";
  import "./index.css";
  import "./registerSW";
  import { makeServer } from "./mocks";
  import { queryClient } from "./config/queryClient";

  // Initialize MirageJS server in development (only once)
  if (import.meta.env.DEV && !(window as any).__MIRAGE_SERVER__) {
    const server = makeServer({ environment: 'development' });
    (window as any).__MIRAGE_SERVER__ = server;
  }

  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <App />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
