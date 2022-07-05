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
            };
        }[];
    };
};

function Playlist() {
    const { user } = useAuth();
    const { id: playlistId } = useParams();
    const [playlist, setPlaylist] = useState<PlaylistDto>();

    console.log(`Playlist ${playlistId}`);

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

    useEffect(() => {
        fetchPlaylists();
    }, [playlistId]);

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
            <ul className="Tracklist" role="list">
                {playlist.tracks.items.map((item) => {
                    const album = item.track.album;

                    return (
                        <li className="Track" key={item.track.id}>
                            <div>{item.track.name}</div>
                            <div>{album.name}</div>
                            <div>{item.track.duration}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Playlist;
