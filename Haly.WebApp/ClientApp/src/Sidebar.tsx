import "./Sidebar.css";
import { Link } from "react-router-dom";
import { PlaylistDto } from "./Playlist";
import { useAuth } from "react-oidc-context";
import SpotifyAttribution from "./SpotifyAttribution";
import useResize from "./useResize";

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
                <li className="SidebarItem" key={p.id}>
                    <Link to={to}>{p.name}</Link>
                </li>
            );
        });
    }

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <nav className="SidebarWrapper" style={{ width }} onMouseDown={enableResize}>
            <ul className="Sidebar">
                <SpotifyAttribution />
                <button onClick={() => auth.removeUser()}>Log out</button>
                <hr />
                {playlistsJsx}
            </ul>
            <div className="Dragger" />
        </nav>
    );
}

export default Sidebar;
