import { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import AnimeList from "../components/AnimeList/AnimeList";
import type { Anime } from "../types/anime";
import { addFavorite } from "../utils/localStorage";

function Home() {
  const [searchResults, setSearchResults] = useState<Anime[]>([]);

  // Add to Favorites
  const handleAddFavorite = (anime: Anime) => {
    addFavorite(anime);
    alert(`${anime.title} has been added to favorites!`);
  };

  return (
    <section className="home-page">
      <SearchBar onSearchResults={setSearchResults} />
      <AnimeList
        animes={searchResults}
        variant="compact"
        onAddFavorite={handleAddFavorite}
      />
    </section>
  );
}

export default Home;
