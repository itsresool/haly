import { globalCss } from "./theme";
import "modern-css-reset";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/200.css";
import "@fontsource/plus-jakarta-sans/700.css";

const globalStyles = globalCss({
    body: {
        fontFamily: "$primary",
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
    },
});

globalStyles();
