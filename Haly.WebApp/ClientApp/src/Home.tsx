// eslint-disable-next-line no-unused-vars
type HomeProps = null;

const greetings = ["Welcome", "Hello", "Hi"];

export function Home() {
    return (
        <>
            <h1 style={{ fontSize: "72px" }}>{greetings[Math.floor(Math.random() * greetings.length)]}</h1>
            <br />
            <br />
        </>
    );
}
