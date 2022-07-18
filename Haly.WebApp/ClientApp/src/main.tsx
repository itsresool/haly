import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globalStyles";
import { BrowserRouter } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";
import { QueryClient, QueryClientProvider } from "react-query";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={new QueryClient()}>
                <AuthWrapper appContent={<App.Content />} loginScreen={<App.Login />} />
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
