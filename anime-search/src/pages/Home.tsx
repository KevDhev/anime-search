import { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import AnimeList from "../components/AnimeList/AnimeList";
import type { Anime } from "../types/anime";

function Home() {
  const [searchResults, setSearchResults] = useState<Anime[]>([]);

  return (
    <section className="home-page">
      <SearchBar onSearchResults={setSearchResults}></SearchBar>
      <AnimeList animes={searchResults}></AnimeList>
    </section>
  );
}

export default Home;
