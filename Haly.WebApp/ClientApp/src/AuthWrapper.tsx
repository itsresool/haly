import { AuthProvider, AuthProviderProps, useAuth } from "react-oidc-context";
import { WebStorageStateStore } from "oidc-client-ts";
import React from "react";

type AuthComponentProps = {
    loginScreen: React.ReactNode;
    appContent: React.ReactNode;
};

function AuthController(props: AuthComponentProps) {
    const auth = useAuth();

    if (auth.error) {
        // TODO: show toast when in error state
        console.log(`OAuth auth error ${auth.error.message}`);
    }

    if (auth.user && !auth.isAuthenticated) {
        console.log("Trying silent refresh");
        auth.signinSilent();
        // TODO: only show this after 5 seconds
        return (
            <div>
                <p>Trying to sign in silently. If you are stuck on this screen, try to log in manually</p>
                <button onClick={() => auth.signinRedirect()}>Log in manually</button>
            </div>
        );
    }

    if (!auth.isAuthenticated) return <>{props.loginScreen}</>;

    return <>{props.appContent}</>;
}

const oAuthConfig: AuthProviderProps = {
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

function AuthWrapper(props: AuthComponentProps) {
    return (
        <AuthProvider {...oAuthConfig}>
            <AuthController {...props} />
        </AuthProvider>
    );
}

export default AuthWrapper;
