import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import "./Playlist.css";

export type PlaylistDto = {
    id: string;
    name: string;
    tracks: {
        total: number;
        items: {
            track: {
                album: {
                    id: string;
                    name: string;
                    artists: { id: string; name: string }[];
                };
                artists: { id: string; name: string }[];
                id: string;
                name: string;
                duration: string;
                duration_ms: number;
            };
        }[];
    };
};

function Playlist() {
    const { user } = useAuth();
    const { id: playlistId } = useParams();
    const [playlist, setPlaylist] = useState<PlaylistDto>();

    console.log(`Playlist ${playlistId}`);

    useEffect(() => {
        async function fetchPlaylists() {
            try {
                const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/playlist/${playlistId}`, {
                    headers: { "x-haly-token": user!.access_token! },
                });
                if (resp.ok) {
                    console.log(resp.statusText);
                    setPlaylist(await resp.json());
                }
            } catch (e) {
                console.error(e);
            }
        }

        fetchPlaylists();
    }, [playlistId, user]);

    if (!playlist) {
        return (
            <div>
                <h1>Playlist: {playlistId}</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>{playlist.name}</h1>
            <ul className="Tracklist">
                {playlist.tracks.items.map((item) => {
                    const { id, name, album, duration_ms } = item.track;

                    return (
                        <li className="Track" key={id}>
                            <div>{name}</div>
                            <div>{album.name}</div>
                            <div>{duration_ms}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Playlist;
