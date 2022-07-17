import { useAuth } from "react-oidc-context";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Playlist, { PlaylistDto } from "./Playlist";
import UserDropdown from "./UserDropdown";
import { Home } from "./Home";
import { styled } from "./theme";
import Profile from "./Profile";
import HalySettings from "./HalySettings";

const LoginWrapper = styled("div", {
    width: "40vw",
    margin: "$900 auto",
    color: "$black700",
    textAlign: "center",
    "& h1": {
        marginBottom: "$500",
    },
});

function LoginScreen() {
    const auth = useAuth();

    return (
        <LoginWrapper>
            <h1>HALY</h1>
            <button onClick={() => auth.signinRedirect()}>Log in</button>
        </LoginWrapper>
    );
}

const Main = styled("div", {
    position: "absolute",
    left: "240px",
    margin: "$800 $700",
});

export type User = {
    id: string;
    name: string;
    market: string;
};

function AppContent() {
    const auth = useAuth();
    const [playlists, setPlaylists] = useState<PlaylistDto[]>([]);
    const [user, setUser] = useState<User>();

    async function fetchUser() {
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/users/me`, {
                method: "PUT",
                headers: { "x-haly-token": auth.user!.access_token! },
            });
            if (resp.ok) {
                console.log(resp.statusText);
                setUser(await resp.json());
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    if (!user) return null;

    return (
        <>
            <UserDropdown user={user} />
            <Sidebar playlists={playlists} />
            <Main>
                <Routes>
                    <Route path="/" element={<Home userId={user.id} setPlaylists={setPlaylists} />} />
                    <Route path="/playlists/:id" element={<Playlist />} />
                    <Route path="/me" element={<Profile />} />
                    <Route path="/me/appsettings" element={<HalySettings />} />
                </Routes>
            </Main>
        </>
    );
}

export default { Content: AppContent, Login: LoginScreen };
