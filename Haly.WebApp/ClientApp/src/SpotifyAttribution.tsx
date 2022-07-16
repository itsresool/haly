import whiteLogoUrl from "../assets/spotify_logo_white.png";
import { styled } from "./theme";

const SpotifyLogo = styled("img", {
    height: "$spotifyLogo",
    margin: "$spotifyLogo",
});

function SpotifyAttribution() {
    return <SpotifyLogo src={whiteLogoUrl} alt="Spotify's Logo" />;
}

export default SpotifyAttribution;
