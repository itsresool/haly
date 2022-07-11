import { createStitches } from "@stitches/react";

// Their logo needs to be at minimum 70x30px
// https://developer.spotify.com/documentation/general/design-and-branding/#attribution
const SPOTIFY_LOGO_HEIGHT = "36px";
const SPOTIFY_LOGO_SPACE = `${36 / 2}px`;

export const { styled, globalCss } = createStitches({
    theme: {
        colors: {
            primary: "#001f3f",
            white: "#fff",
        },
        fonts: {
            primary: '"Plus Jakarta Sans", sans-serif',
        },
        space: {
            1: "2px",
            2: "4px",
            3: "6px",
            4: "8px",
            5: "12px",
            6: "16px",
            7: "24px",
            8: "32px",
            9: "48px",
            spotifyLogo: SPOTIFY_LOGO_SPACE,
        },
        sizes: {
            spotifyLogo: SPOTIFY_LOGO_HEIGHT,
        },
    },
});
