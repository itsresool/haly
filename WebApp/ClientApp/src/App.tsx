import './App.css'

function App() {
    let authInSpotify = () => {
        fetch("/login");
    };

    return (
        <div className="App">
            <button onClick={authInSpotify}>Auth in Spotify</button>
        </div>
    )
}

export default App
