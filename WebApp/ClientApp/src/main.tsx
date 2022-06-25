import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {AuthProvider, AuthProviderProps} from "react-oidc-context";

const oAuthConfig: AuthProviderProps = {
    // Their authority endpoint is blocked by CORS, so we need to specify
    // auth and token endpoints manually in metadata prop
    authority: import.meta.env.VITE_OAUTH_AUTHORITY,
    metadata: {
        authorization_endpoint: import.meta.env.VITE_OAUTH_AUTH_ENDPOINT,
        token_endpoint: import.meta.env.VITE_OAUTH_TOKEN_ENDPOINT,
    },
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
    client_secret: import.meta.env.VITE_OAUTH_CLIENT_SECRET,
    redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI,
    scope: import.meta.env.VITE_OAUTH_SCOPE,
    onSigninCallback
}

console.log(oAuthConfig)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider {...oAuthConfig}>
            <App/>
        </AuthProvider>
    </React.StrictMode>
)

function onSigninCallback() {
    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    )
}
