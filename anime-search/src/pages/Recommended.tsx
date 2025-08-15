import { useEffect, useState } from "react";
import type { Anime } from "../types/anime";
import { getRandomAnimes } from "../utils/randomAnime";

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
      <h1>Recommended Anime</h1>
      <article className="anime-detail">
        <img
          src={
            currentAnime.images.jpg.large_image_url ||
            currentAnime.images.jpg.image_url
          }
          alt={`Cover of ${currentAnime.title}`}
          className="anime-cover"
        />
        <div className="anime-info">
          <h2>{currentAnime.title}</h2>
          {currentAnime.score && (
            <p>⭐ Score: {currentAnime.score.toFixed(1)}</p>
          )}
          {currentAnime.episodes && <p>📺 Episodes: {currentAnime.episodes}</p>}
          {currentAnime.synopsis && (
            <p className="synopsis">{currentAnime.synopsis}</p>
          )}
          {currentAnime.genres && (
            <ul className="genres">
              {currentAnime.genres.map((genre) => (
                <li key={genre.mal_id}>{genre.name}</li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </section>
  );
}

export default Recommended;
