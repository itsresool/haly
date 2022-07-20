import { Link } from "react-router-dom";
import { PlaylistDto } from "./Playlist";
import { styled } from "./theme";
import SpotifyAttribution from "./SpotifyAttribution";
import useResize from "./useResize";
import { useQuery } from "react-query";
import { useAuth } from "react-oidc-context";
import { Waveform } from "@uiball/loaders";

const Nav = styled("nav", {
    minWidth: 100,
    width: 240,
    position: "fixed",
    height: "100%",
    background: "$primary",
    color: "$white",
    userSelect: "none",
});

const SidebarWrapper = styled("ul", {
    margin: 0,
    padding: 0,
    listStyle: "none",
    "& > hr": {
        margin: "$600 0",
    },
    "& a": {
        color: "$white",
        textDecoration: "none",
    },
    "& > a": {
        color: "$white",
        background: "inherit",
        outline: "none",
        border: "none",
        textDecoration: "none",
        margin: "0 $spotifyLogo $spotifyLogo",
        padding: 0,
    },
});

const SidebarItem = styled("li", {
    margin: "0 $spotifyLogo $300",
    cursor: "pointer",
});

const Dragger = styled("div", {
    width: "5px",
    cursor: "ew-resize",
    padding: "4px 0 0",
    borderTop: "1px solid #ddd",
    position: "absolute",
    top: "-1px",
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "deeppink",
});

type OwnProps = {
    userId: string;
};

function Sidebar(props: OwnProps) {
    const auth = useAuth();
    const { width, enableResize } = useResize({ defaultWidth: 240, minWidth: 150, maxWidth: 340 });

    async function fetchPlaylists() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setTimeout(() => {}, 100000);
            const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/users/${props.userId}/playlists`, {
                method: "PUT",
                headers: { "x-haly-token": auth.user!.access_token! },
            });
            if (resp.ok) {
                console.log("Playlists:", resp.statusText);
                return resp.json();
            }
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    const { data: playlists } = useQuery<PlaylistDto[]>(["user", "playlists"], fetchPlaylists);

    let playlistsJsx;
    if (!playlists || playlists.length === 0) {
        playlistsJsx = <Waveform />;
    } else {
        playlistsJsx = playlists!.map((p) => {
            const to = `playlists/${p.id}`;

            return (
                <SidebarItem key={p.id}>
                    <Link to={to}>{p.name}</Link>
                </SidebarItem>
            );
        });
    }

    return (
        <Nav style={{ width }} onMouseDown={enableResize}>
            <SidebarWrapper>
                <SpotifyAttribution />
                <Link to={"/"}>Home</Link>
                <hr />
                {playlistsJsx}
            </SidebarWrapper>
            <Dragger />
        </Nav>
    );
}

export default Sidebar;
