import type { Anime } from "./anime";
import { createContext } from "react";

// Data that will have the context
export interface FavoritesContextType {
  favorites: Anime[];
  isFavorite: (animeId: number) => boolean;
  toggleFavorite: (anime: Anime) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);
