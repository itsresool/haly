import { useAuth } from "react-oidc-context";
import { Dispatch, SetStateAction } from "react";
import { PlaylistDto } from "./Playlist";

type HomeProps = {
    userId: string;
    setPlaylists: Dispatch<SetStateAction<PlaylistDto[]>>;
};

const greetings = ["Welcome", "Hello", "Hi"];

export function Home(props: HomeProps) {
    const auth = useAuth();

    async function fetchPlaylists() {
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/users/${props.userId}/playlists`, {
                method: "PUT",
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
            <h1 style={{ fontSize: "72px" }}>{greetings[Math.floor(Math.random() * greetings.length)]}</h1>
            <br />
            <button onClick={() => fetchPlaylists()}>Show user playlists</button>
            <br />
        </>
    );
}
