import { useEffect, useState } from "react";
import type { Anime } from "../types/anime";
import { getRandomAnimes } from "../utils/randomAnime";

function Recommended() {
  const [currentAnime, setCurrentAnime] = useState<Anime | null>(null);

  // Get a random anime and save the latest update
  const loadRandomAnime = async () => {
    const animes = await getRandomAnimes("top", 1);

    if (animes.length > 0) {
      setCurrentAnime(animes[0]);

      // Save the last update time
      localStorage.setItem("lastAnimeUpdate", Date.now().toString());
    }
  };

  // Check if it's time to change the anime
  useEffect(() => {
    const lastUpdate = localStorage.getItem("lastAnimeUpdate");
    const now = Date.now();
    const hoursToWait = 6;

    if (
      !lastUpdate ||
      now - Number(lastUpdate) > hoursToWait * 60 * 60 * 1000
    ) {
      loadRandomAnime();
    } else {
      // Load the last anime shown (if it exists)
      const savedAnime = localStorage.getItem("currentAnime");
      if (savedAnime) setCurrentAnime(JSON.parse(savedAnime));
    }
  }, []);

  if (!currentAnime)
    return <section className="loading">Loading recommendations...</section>;

  return (
    <section className="recommended-page">
      <h1>Recommended Anime of the Day</h1>
      <article className="anime-detail">
        <img
          src={
            currentAnime.images.jpg.large_image_url ||
            currentAnime.images.jpg.image_url
          }
          alt={currentAnime.title}
          className="detail-image"
        />
        <div className="anime-info">
          <h2>{currentAnime.title}</h2>
          {currentAnime.score && <p>⭐ Score: {currentAnime.score}</p>}
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
