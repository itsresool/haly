import { styled } from "./theme";

const StyledLogin = styled("div", {
    width: "40vw",
    margin: "$900 auto",
    color: "$black700",
    textAlign: "center",
    "& h1": {
        marginBottom: "$500",
    },
});

export function Login(props: { loginFn: () => unknown }) {
    return (
        <StyledLogin>
            <h1>HALY</h1>
            <button type="button" onClick={props.loginFn}>
                Log in
            </button>
        </StyledLogin>
    );
}

export function SilentLogin(props: { loginFn: () => unknown }) {
    props.loginFn();

    return null;
}
