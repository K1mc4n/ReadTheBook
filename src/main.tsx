import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import { config } from "./wagmi.ts";
import "./index.css";

// Pastikan elemen root tersedia
const rootElement = document.getElementById("root");

if (rootElement) {
  const queryClient = new QueryClient();

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  );
} else {
  console.error("❌ No root element found in index.html");
}
