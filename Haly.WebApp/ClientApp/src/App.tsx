import { useAuth } from "react-oidc-context";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Playlist, { PlaylistDto } from "./Playlist";
import UserDropdown from "./UserDropdown";
import { Home } from "./Home";
import { styled } from "./theme";

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

function AppContent() {
    const [playlists, setPlaylists] = useState<PlaylistDto[]>([]);

    return (
        <>
            <UserDropdown />
            <Sidebar playlists={playlists} />
            <Main>
                <Routes>
                    <Route path="/" element={<Home setPlaylists={setPlaylists} />} />
                    <Route path="/playlists/:id" element={<Playlist />} />
                </Routes>
            </Main>
        </>
    );
}

export default { Content: AppContent, Login: LoginScreen };
