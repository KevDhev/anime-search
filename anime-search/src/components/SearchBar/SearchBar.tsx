import { searchAnime } from "../../services/jikanAPI";
import { useState, useRef } from "react";
import React from "react";
import "./SearchBar.css";

function SearchBar() {
  // Local state for the search term
  const [searchTerm, setSearchTerm] = useState("");
  const debounceRef = useRef<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value); // Update the state with what the user types
  };

  // Clear the previous timeout
  if (debounceRef.current !== null) {
    clearTimeout(debounceRef.current);
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const results = await searchAnime(searchTerm);
      console.log(`Animes found: ${results.data}`);
    } catch (error) {
      console.error(`Search error: ${error}`);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Ex: Naruto"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
