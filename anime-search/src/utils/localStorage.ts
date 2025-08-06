import type { Anime } from "../types/anime";

const FAVORITES_KEY = "favoriteAnimes";

// Get favorites
export const getFavorites = (): Anime[] => {
  if (typeof window === "undefined") return []; // For SSR compatibility

  const stored = localStorage.getItem(FAVORITES_KEY);

  return stored ? JSON.parse(stored) : [];
};

// Add anime to favorites
export const addFavorite = (anime: Anime): void => {
  const favorites = getFavorites();

  if (!favorites.some((fav) => fav.mal_id === anime.mal_id)) {
    const updated = [...favorites, anime];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  }
};

// Remove anime from favorites (by ID)
export const removeFavorite = (animeId: number): void => {
  const favorites = getFavorites();
  const updated = favorites.filter((fav) => fav.mal_id !== animeId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};
