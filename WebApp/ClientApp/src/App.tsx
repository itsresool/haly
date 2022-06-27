import './App.css'
import {useAuth} from "react-oidc-context";

function App() {
    const auth = useAuth()
    console.log(auth)

    async function fetchPlaylists() {
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/playlist`, {headers: {"x-haly-token": auth.user?.access_token!}})
            if (resp.ok) {
                console.log(resp.statusText);
            }
        } catch (e) {
        }
    }

    if (auth.error) {
        // TODO: show toast when in error state
        console.log(`OAuth auth error ${auth.error.message}`);
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                Hello there!
                <br/>
                <button onClick={() => void auth.removeUser()}>Log out</button>
                <button onClick={() => fetchPlaylists()}>Show user playlists</button>
            </div>
        );
    }

    return (
        <div className="App">
            <h1>HALY</h1>
            <button onClick={() => void auth.signinRedirect()}>Log in</button>
        </div>
    )
}

export default App
