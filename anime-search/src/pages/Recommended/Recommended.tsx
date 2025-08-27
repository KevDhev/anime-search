import { useEffect, useState } from "react";
import type { Anime } from "../../types/anime";
import { getRandomAnimes } from "../../utils/randomAnime";
import AnimeCard from "../../components/AnimeCard/AnimeCard";

function Recommended() {
  const [currentAnime, setCurrentAnime] = useState<Anime | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load or refresh anime
  const loadRandomAnime = async () => {
    try {
      const animes = await getRandomAnimes(1);

      if (animes.length === 0) {
        throw new Error("No anime found");
      }

      setCurrentAnime(animes[0]);
      localStorage.setItem("lastAnimeUpdate", Date.now().toString());
      localStorage.setItem("currentAnime", JSON.stringify(animes[0]));
    } catch (err) {
      setError("Failed to load recommendations. Please try again later.");
      console.error(err);
    }
  };

  // Check if we need to fetch new anime
  useEffect(() => {
    const lastUpdate = localStorage.getItem("lastAnimeUpdate");
    const now = Date.now();
    const hoursToWait = 6; // Change anime every 6 hours

    if (
      !lastUpdate ||
      now - Number(lastUpdate) > hoursToWait * 60 * 60 * 1000
    ) {
      loadRandomAnime();
    } else {
      const savedAnime = localStorage.getItem("currentAnime");
      if (savedAnime) setCurrentAnime(JSON.parse(savedAnime));
    }
  }, []);

  if (error) return <p className="error-message">{error}</p>;

  if (!currentAnime)
    return <p className="loading">Loading recommendations...</p>;

  return (
    <section className="recommended-page">
      <h2>Recommended Anime</h2>
      <AnimeCard anime={currentAnime} variant="detailed" />
    </section>
  );
}

export default Recommended;
