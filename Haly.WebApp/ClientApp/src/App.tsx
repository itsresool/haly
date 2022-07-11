import "./App.css";
import { useAuth } from "react-oidc-context";
import { Dispatch, SetStateAction, useState } from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Playlist, { PlaylistDto } from "./Playlist";

type HomeProps = {
    setPlaylists: Dispatch<SetStateAction<PlaylistDto[]>>;
};

function Home(props: HomeProps) {
    const auth = useAuth();

    async function fetchPlaylists() {
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/playlist`, {
                headers: { "x-haly-token": auth.user!.access_token! },
            });
            if (resp.ok) {
                console.log(resp.statusText);
                props.setPlaylists(await resp.json());
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h1 style={{ fontSize: "96px" }}>+Jakarta Sans</h1>
            <br />
            <button onClick={() => auth.removeUser()}>Log out</button>
            <button onClick={() => fetchPlaylists()}>Show user playlists</button>
            <br />
        </>
    );
}

function App() {
    const auth = useAuth();
    const [playlists, setPlaylists] = useState<PlaylistDto[]>([]);

    if (auth.error) {
        // TODO: show toast when in error state
        console.log(`OAuth auth error ${auth.error.message}`);
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                <Sidebar playlists={playlists} />
                <div className="AppContent">
                    <Routes>
                        <Route path="/" element={<Home setPlaylists={setPlaylists} />} />
                        <Route path="/playlists/:id" element={<Playlist />} />
                    </Routes>
                </div>
            </div>
        );
    }

    if (auth.user && !auth.isAuthenticated) {
        console.log("Trying silent refresh");
        auth.signinSilent();
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
