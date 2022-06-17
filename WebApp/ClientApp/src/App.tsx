import './App.css'

function App() {

    console.log(import.meta.env.VITE_API_ORIGIN);
    
    return (
        <div className="App">
            <a href="/v1/login">Login with Spotify</a>
        </div>
    )
}

export default App
