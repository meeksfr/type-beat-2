import SearchBar from "../components/SearchBar";
import { fetchPlaylists } from "../services/api";

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <SearchBar onSearch={fetchPlaylists} />
        </div>
    )
}

export default Home;
