import { globalCss } from "./theme";
import "modern-css-reset";
import "../fonts/main.css";

const globalStyles = globalCss({
    body: {
        fontFamily: "$primary",
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
    },
});

globalStyles();
