import "./Sidebar.css";
import { Link } from "react-router-dom";
import { PlaylistDto } from "./Playlist";
import { useAuth } from "react-oidc-context";
import SpotifyAttribution from "./SpotifyAttribution";

type OwnProps = {
    playlists: PlaylistDto[];
};

function Sidebar(props: OwnProps) {
    const auth = useAuth();
    if (props.playlists.length == 0) {
        return (
            <ul role="list" className="Sidebar">
                No playlists
            </ul>
        );
    }

    return (
        <ul role="list" className="Sidebar">
            <SpotifyAttribution />
            <button onClick={() => void auth.removeUser()}>Log out</button>
            <hr />
            {props.playlists.map((p) => {
                const to = `playlists/${p.id}`;

                return (
                    <li className="SidebarItem" key={p.id}>
                        <Link to={to}>{p.name}</Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default Sidebar;
