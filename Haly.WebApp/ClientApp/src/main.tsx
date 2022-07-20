import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globalStyles";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "react-oidc-context";
import Authentication, { AuthenticationFallback, oAuthConfig } from "./Authentication";
import { ErrorBoundary } from "react-error-boundary";

document.title = "Haly";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider {...oAuthConfig}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <ErrorBoundary FallbackComponent={AuthenticationFallback}>
                        <Authentication>
                            <App />
                        </Authentication>
                    </ErrorBoundary>
                </QueryClientProvider>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>,
);
