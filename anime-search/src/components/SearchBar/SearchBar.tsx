import { searchAnime } from "../../services/jikanAPI";
import { useState, useRef } from "react";
import AnimeList from "../AnimeList/AnimeList";
import type { Anime } from "../../types/anime";

function SearchBar() {
  // Local state for the search term
  const [searchTerm, setSearchTerm] = useState("");
  const [animes, setAnimes] = useState<Anime[]>([]);
  const debounceRef = useRef<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value); // Update the state with what the user types

    // Clear the previous timeout
    if (debounceRef.current !== null) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout
    debounceRef.current = window.setTimeout(async () => {
      if (value.trim().length > 2) {
        try {
          const results = await searchAnime(value);
          setAnimes(results.data);
          console.log(`Results: ${results.data}`);
        } catch (error) {
          console.error(`Error: ${error}`);
          setAnimes([]);
        }
      }
    }, 500);
  };

  const handleSearch = async () => {
    if (searchTerm.trim().length === 0) return;

    try {
      const results = await searchAnime(searchTerm);
      setAnimes(results.data);
      console.log(`Animes found: ${results.data}`);
    } catch (error) {
      console.error(`Search error: ${error}`);
      setAnimes([]);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Ex: Naruto"
      />
      <button onClick={handleSearch}>Search</button>

      {/* Anime List receives the state's anime. */}
      <AnimeList animes={animes} />
    </div>
  );
}

export default SearchBar;
