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
            black700: "#0a0a0a",
            black700Hover: "#282828",
            black700HoverOfAHover: "#3e3e3e",
        },
        fonts: {
            primary: '"Plus Jakarta Sans", sans-serif',
        },
        fontSizes: {
            200: "13px",
            300: "14px",
            400: "16px",
        },
        space: {
            100: "2px",
            200: "4px",
            300: "6px",
            400: "8px",
            500: "12px",
            600: "16px",
            700: "24px",
            800: "32px",
            900: "48px",
            spotifyLogo: SPOTIFY_LOGO_SPACE,
        },
        sizes: {
            spotifyLogo: SPOTIFY_LOGO_HEIGHT,
            userDropdownTriggerSpanMinWidth: "110px",
            userDropdownMinWidth: "196px",
        },
    },
});
