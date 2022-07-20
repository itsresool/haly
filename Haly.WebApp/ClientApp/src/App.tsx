import { styled } from "./theme";
import useAccessToken from "./useAccessToken";
import { useQuery, useQueryErrorResetBoundary } from "react-query";
import { Waveform } from "@uiball/loaders";
import Playlist from "./Playlist";
import HalySettings from "./HalySettings";
import UserDropdown from "./UserDropdown";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import React from "react";
import { UserContext } from "./UserContext";
import { FallbackProps } from "react-error-boundary";

const Main = styled("div", {
    position: "absolute",
    left: "240px",
    margin: "$800 $700",
});

async function fetchUserInfo(accessToken: string) {
    const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/users/me`, {
        method: "PUT",
        headers: { "x-haly-token": accessToken },
    });
    if (!resp.ok) throw new Error(resp.statusText);

    console.log("User:", resp.statusText);
    return resp.json();
}

function App() {
    const accessToken = useAccessToken();
    const { isLoading, data: user, error } = useQuery(["users", "me"], () => fetchUserInfo(accessToken));

    if (error) return <h1 style={{ color: "red" }}>App error</h1>;
    if (isLoading || !user) return <h1>App is loading</h1>;

    return (
        <UserContext.Provider value={user}>
            <UserDropdown />
            <Sidebar userId={user.id} />
            <Main>
                <React.Suspense fallback={<Waveform />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/playlists/:id" element={<Playlist />} />
                        <Route path="/me" element={<Profile />} />
                        <Route path="/me/appsettings" element={<HalySettings />} />
                    </Routes>
                </React.Suspense>
            </Main>
        </UserContext.Provider>
    );
}

export function AppFallback(props: FallbackProps) {
    const { reset } = useQueryErrorResetBoundary();

    return (
        <div>
            <h1>Something went wrong</h1>
            <pre>{props.error.message}</pre>
            <button onClick={reset}>Try again</button>
        </div>
    );
}

export default App;
