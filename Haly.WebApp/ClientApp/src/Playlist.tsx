import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { styled } from "./theme";

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

const Tracklist = styled("ul", {
    padding: 0,
});

const Track = styled("li", {
    display: "flex",
    flexDirection: "row",

    "& > div": {
        marginRight: "$600",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",

        "&:nth-child(1)": {
            width: "400px",
        },
        "&:nth-child(2)": {
            width: "200px",
        },
        "&:nth-child(3)": {
            width: "80px",
        },
    },
});

function Playlist() {
    const { user } = useAuth();
    const { id: playlistId } = useParams();
    const [playlist, setPlaylist] = useState<PlaylistDto>();

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
        return null;
    }

    return (
        <div>
            <h1>{playlist.name}</h1>
            <Tracklist>
                {playlist.tracks.items.map((item) => {
                    const { id, name, album, duration_ms } = item.track;

                    return (
                        <Track key={id}>
                            <div>{name}</div>
                            <div>{album.name}</div>
                            <div>{duration_ms}</div>
                        </Track>
                    );
                })}
            </Tracklist>
        </div>
    );
}

export default Playlist;
