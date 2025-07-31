// Minimum response we expect from the API
type AnimeSearchResult = {
  data: {
    mal_id: number;
    title: string;
    images: { jpg: { image_url: string } };
    synopsis: string;
  }[];
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
