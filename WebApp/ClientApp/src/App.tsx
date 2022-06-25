import './App.css'
import {useAuth} from "react-oidc-context";

function App() {
    const auth = useAuth()

    switch (auth.activeNavigator) {
        case "signinSilent":
            return <div>Signing you in...</div>;
        case "signoutRedirect":
            return <div>Signing you out...</div>;
    }

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Oops... {auth.error.message}</div>;
    }

    async function fetchPlaylists() {
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/playlist`, {headers: {"X-HalyToken": auth.user?.access_token!}})
            if (resp.ok) {
                console.log(resp.statusText);
            }
        } catch (e) {
        }
    }

    if (auth.isAuthenticated) {
        console.log(auth.user?.access_token);
        return (
            <div>
                Hello {auth.user?.profile.sub}{" "}
                <button onClick={() => void auth.removeUser()}>Log out</button>
                <button onClick={() => fetchPlaylists()}>Show user playlists</button>
            </div>
        );
    }

    return (
        <div className="App">
            <button onClick={() => void auth.signinRedirect()}>Log in</button>
        </div>
    )
}

export default App
