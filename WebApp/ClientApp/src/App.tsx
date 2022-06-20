import './App.css'

function App() {
    const loginUrl = `${import.meta.env.VITE_API_ORIGIN}/login`;
    return (
        <div className="App">
            <a href={loginUrl}>Login with Spotify</a>
        </div>
    )
}

export default App
