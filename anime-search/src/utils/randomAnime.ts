import type { Anime } from "../types/anime";

const JIKAN_API_URL = "https://api.jikan.moe/v4";

// Supported filter types
type Filter = "top" | "popular" | "upcoming" | "bypopularity";

/*
 * Get random anime based on a Jikan filter
 * @param filter - Filter type (ex: 'top')
 * @param limit - Maximum number of animes to return (default: 5)
 */

export const getRandomsAnimes = async (
  filter: Filter = "top",
  limit: number = 5
): Promise<Anime[]> => {
  try {
    // 1. Consult Jikan with the filter
    const response = await fetch(`${JIKAN_API_URL}/top/anime?filter=${filter}`);
    if (!response.ok) throw new Error("Error getting anime");

    // 2. Extract and mix results
    const data: { data: Anime[] } = await response.json();
    const shuffled = [...data.data].sort(() => 0.5 - Math.random());

    // 3. Return a random subset
    return shuffled.slice(0, limit);
  } catch (error) {
    console.error(`Error in getRandomAnimes: ${error}`);
    return [];
  }
};
