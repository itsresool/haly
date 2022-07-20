import { AuthProviderProps, useAuth } from "react-oidc-context";
import React from "react";
import { Login, SilentLogin } from "./Login";
import { WebStorageStateStore } from "oidc-client-ts";
import { FallbackProps, useErrorHandler } from "react-error-boundary";

export const oAuthConfig: AuthProviderProps = {
    // Their authority endpoint is blocked by CORS, so we need to specify
    // auth and token endpoints manually in metadata prop
    authority: import.meta.env.VITE_OAUTH_AUTHORITY,
    metadata: {
        authorization_endpoint: import.meta.env.VITE_OAUTH_AUTH_ENDPOINT,
        token_endpoint: import.meta.env.VITE_OAUTH_TOKEN_ENDPOINT,
        revocation_endpoint: import.meta.env.VITE_OAUTH_REVOKE_ENDPOINT,
    },
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
    client_secret: import.meta.env.VITE_OAUTH_CLIENT_SECRET,
    redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI,
    scope: import.meta.env.VITE_OAUTH_SCOPE,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    revokeTokensOnSignout: true,
    onSigninCallback() {
        window.history.replaceState({}, document.title, window.location.pathname);
    },
};

export function AuthenticationFallback(props: FallbackProps) {
    const auth = useAuth();

    return (
        <div>
            <h1>Auth went wrong</h1>
            <pre>{props.error.message}</pre>
            <button onClick={props.resetErrorBoundary}>Try again</button>
            <button onClick={() => auth.removeUser().then(props.resetErrorBoundary)}>Force logout</button>
        </div>
    );
}

type AuthenticationProps = {
    children: React.ReactNode;
};

function Authentication(props: AuthenticationProps) {
    const auth = useAuth();
    const handleError = useErrorHandler();

    if (auth.error) {
        handleError(auth.error);
    }

    if (auth.isLoading) {
        return <h1>Loading...</h1>;
    }

    if (auth.isAuthenticated) {
        return <>{props.children}</>;
    }

    const oldLoginExists = auth.user && !auth.isAuthenticated;
    if (oldLoginExists) return <SilentLogin loginFn={auth.signinSilent} />;

    return <Login loginFn={auth.signinRedirect} />;
}

export default Authentication;
