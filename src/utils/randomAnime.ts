import type { Anime } from "../types/anime";

const JIKAN_API_URL = "https://api.jikan.moe/v4";

/*
 * Get random anime from Jikan's top list
 * @param limit - Maximum number of animes to return (default: 1)
 */

export const getRandomAnimes = async (limit: number = 1): Promise<Anime[]> => {
  try {
    // 1. Fetch top anime list
    const response = await fetch(`${JIKAN_API_URL}/top/anime`);
    if (!response.ok) throw new Error("Failed to fetch anime");

    // 2. Parse and validate response
    const data = await response.json();
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid API response format");
    }

    // 3. Shuffle and slice
    const shuffled = [...data.data].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  } catch (error) {
    console.error(`Error in getRandomAnimes: ${error}`);
    return [];
  }
};
