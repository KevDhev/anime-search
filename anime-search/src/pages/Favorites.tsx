import { useState, useEffect } from "react";
import type { Anime } from "../types/anime";
import AnimeList from "../components/AnimeList/AnimeList";
import { getFavorites, removeFavorite } from "../utils/localStorage";

function Favorites() {
  const [favorites, setFavorites] = useState<Anime[]>([]);

  // Synchronization with localStorage
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Remove from favorites
  const handleRemoveFavorite = (animeId: number) => {
    removeFavorite(animeId);
    setFavorites(getFavorites()); // Update the State
  };

  return (
    <section className="favorites-page">
      <h1>Your favorite anime</h1>

      {favorites.length > 0 ? (
        <AnimeList
          animes={favorites}
          onRemoveFavorite={handleRemoveFavorite}
        ></AnimeList>
      ) : (
        <p>You don't have saved anime. Add some from the search!</p>
      )}
    </section>
  );
}

export default Favorites;
