import { Link } from "react-router-dom";
import { PlaylistDto } from "./Playlist";
import { styled } from "./theme";
import { useAuth } from "react-oidc-context";
import SpotifyAttribution from "./SpotifyAttribution";
import useResize from "./useResize";

const SidebarWrapper = styled("nav", {
    minWidth: 100,
    width: 240,
    position: "fixed",
    height: "100%",
    background: "$primary",
    color: "$white",
    userSelect: "none",
});

const Playlists = styled("ul", {
    margin: 0,
    padding: 0,
    listStyle: "none",
    "& > hr": {
        marginBottom: "$500",
    },
    "& a": {
        color: "$white",
        textDecoration: "none",
    },
    "& > button": {
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
    margin: "0 $spotifyLogo $spotifyLogo",
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
    playlists: PlaylistDto[];
};

function Sidebar(props: OwnProps) {
    const auth = useAuth();
    const { width, enableResize } = useResize({ defaultWidth: 240, minWidth: 150, maxWidth: 340 });

    let playlistsJsx;
    if (props.playlists.length === 0) {
        playlistsJsx = <p>No playlists</p>;
    } else {
        playlistsJsx = props.playlists.map((p) => {
            const to = `playlists/${p.id}`;

            return (
                <SidebarItem key={p.id}>
                    <Link to={to}>{p.name}</Link>
                </SidebarItem>
            );
        });
    }

    return (
        <SidebarWrapper style={{ width }} onMouseDown={enableResize}>
            <Playlists>
                <SpotifyAttribution />
                <button onClick={() => auth.removeUser()}>Log out</button>
                <hr />
                {playlistsJsx}
            </Playlists>
            <Dragger />
        </SidebarWrapper>
    );
}

export default Sidebar;
