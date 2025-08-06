import { searchAnime } from "../../services/jikanAPI";
import { useState, useRef } from "react";
import type { Anime } from "../../types/anime";

interface SearchBarProps {
  onSearchResults: (results: Anime[]) => void;
}

function SearchBar({ onSearchResults }: SearchBarProps) {
  // Local state for the search term
  const [searchTerm, setSearchTerm] = useState("");
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
          onSearchResults(results.data);
          console.log(`Results: ${results.data}`);
        } catch (error) {
          console.error(`Error: ${error}`);
          onSearchResults([]);
        }
      }
    }, 500);
  };

  const handleSearch = async () => {
    if (searchTerm.trim().length === 0) return;

    try {
      const results = await searchAnime(searchTerm);
      onSearchResults(results.data);
    } catch (error) {
      console.error(`Search error: ${error}`);
      onSearchResults([]);
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
    </div>
  );
}

export default SearchBar;
