import type { Anime } from "../types/anime";

export type AnimeSearchResult = {
  data: Anime[];
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
  };
};

export const searchAnime = async (
  query: string
): Promise<AnimeSearchResult> => {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: AnimeSearchResult = await response.json();
    return data;
  } catch (error) {
    console.error(`Search failed: ${error}`);
    throw error;
  }
};
