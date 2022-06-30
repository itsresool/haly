import "./App.css";
import { useAuth } from "react-oidc-context";
import { useState } from "react";

function App() {
    const auth = useAuth();
    const [playlists, setPlaylists] = useState<any>([]);

    async function fetchPlaylists() {
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/playlist`, {
                headers: { "x-haly-token": auth.user!.access_token! },
            });
            if (resp.ok) {
                console.log(resp.statusText);
                setPlaylists(await resp.json());
            }
        } catch (e) {
            console.error(e);
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
                <br />
                <button onClick={() => void auth.removeUser()}>Log out</button>
                <button onClick={() => fetchPlaylists()}>Show user playlists</button>
                <br />
                {playlists.length > 0 ? (
                    <ul>
                        {playlists.map((p: any) => (
                            <li key={p.id}>{p.name}</li>
                        ))}
                    </ul>
                ) : (
                    <span>No playlists</span>
                )}
            </div>
        );
    }

    if (auth.user && !auth.isAuthenticated) {
        console.log("Trying silent refresh");
        void auth.signinSilent();
        return (
            <div>
                <p>If you are stuck on this screen try to log in manually</p>
                <button onClick={() => auth.signinRedirect()}>Log in manually</button>
            </div>
        );
    }

    return (
        <div className="App">
            <h1>HALY</h1>
            <button onClick={() => auth.signinRedirect()}>Log in</button>
            <button onClick={() => auth.signinSilent()}>Try silently</button>
        </div>
    );
}

export default App;
