import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globalStyles";
import { BrowserRouter } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthWrapper appContent={<App.Content />} loginScreen={<App.Login />} />
        </BrowserRouter>
    </React.StrictMode>,
);
