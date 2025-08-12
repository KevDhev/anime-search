import { useState, useEffect } from "react";
import type { Anime } from "../../types/anime";
import { getRandomsAnimes } from "../../utils/randomAnime";

function Recommended() {
  const [recommendedAnimes, setRecommendedAnimes] = useState<Anime[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Load animes when mounting the component
  useEffect(() => {
    const loadAnimes = async () => {
      const animes = await getRandomsAnimes("top", 10);
      setRecommendedAnimes(animes);
    };
    loadAnimes();
  }, []);

  // 2. Automatic rotation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === recommendedAnimes.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval); // Cleaning when disassembling
  }, [recommendedAnimes.length]); // Dependency to restart if the list changes

  if (recommendedAnimes.length === 0) {
    return <p className="loading">Loading recommendations...</p>;
  }

  // 3. Show only the current anime
  const currentAnime = recommendedAnimes[currentIndex];

  return (
    <section className="recommended-section">
      <h2>Recommended for You</h2>
      <article className="recommended-anime">
        <img
          src={currentAnime.images.jpg.image_url}
          alt={`Cover of ${currentAnime.title}`}
        />
        <h3>{currentAnime.title}</h3>
      </article>
    </section>
  );
}

export default Recommended;
