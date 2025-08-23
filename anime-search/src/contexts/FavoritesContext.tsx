import React, { useEffect, useState } from "react";
import type { Anime } from "../types/anime";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../utils/localStorage";
import {
  FavoritesContext,
  type FavoritesContextType,
} from "../types/favorites";

// Provider: Component that wraps the app and provides the context
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Anime[]>([]);

  // Load favorites on startup
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Check if an anime is favorite
  const isFavorite = (animeId: number): boolean => {
    return favorites.some((favorite) => favorite.mal_id === animeId);
  };

  // Toggle between adding/removing favorites
  const toggleFavorite = (anime: Anime) => {
    if (isFavorite(anime.mal_id)) {
      removeFavorite(anime.mal_id);
    } else {
      addFavorite(anime);
    }

    // Update status with new favorites
    setFavorites(getFavorites());
  };

  // Value provided to child components
  const contextValue: FavoritesContextType = {
    favorites,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}
