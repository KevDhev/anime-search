import type React from "react";
import type { Anime } from "../../types/anime";
import { useFavorites } from "../../hooks/useFavorites";
import "./AnimeCard.css";

interface Props {
  anime: Anime;
  variant?: "detailed" | "compact";
  onOpenModal?: (anime: Anime) => void;
}

function AnimeCard({ anime, variant = "compact", onOpenModal }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(anime);
  };

  const handleCardClick = () => {
    if (onOpenModal && variant === "compact") onOpenModal(anime);
  };

  return (
    <article
      className={`anime-card anime-card--${variant} ${
        onOpenModal ? "clickable" : ""
      }`}
      onClick={handleCardClick}
    >
      <img
        src={anime.images.jpg.image_url}
        alt={`Cover of ${anime.title}`}
        className="anime-card__image"
      />

      <section className="anime-card__content">
        <h2 className="anime-card__title">{anime.title}</h2>

        {/* Additional information depending on the variant */}
        {variant === "detailed" ? (
          // Detailed view
          <section className="anime-card__details">
            {anime.score && (
              <p>
                ⭐ <strong>Score:</strong> {anime.score}
              </p>
            )}
            {anime.episodes && (
              <p>
                📺 <strong>Episodes:</strong> {anime.episodes}
              </p>
            )}
            {anime.genres && (
              <section>
                <strong>Genres:</strong>
                <ul>
                  {anime.genres.map((genre) => (
                    <li key={genre.mal_id}>{genre.name}</li>
                  ))}
                </ul>
              </section>
            )}
            {anime.synopsis && <p>{anime.synopsis}</p>}
          </section>
        ) : (
          // Compact view
          <section className="anime-card__compact-info">
            {anime.score && <p>⭐ Score: {anime.score}</p>}
            {anime.episodes && <p>📺 Episodes: {anime.episodes}</p>}
            {anime.genres && (
              <p>
                Genres:
                <span>
                  {anime.genres.map((genre) => genre.name).join(", ")}
                </span>
              </p>
            )}
          </section>
        )}

        <section className="anime-card__actions">
          <button
            onClick={handleFavoriteClick}
            className={`anime-card__btn ${
              isFavorite(anime.mal_id)
                ? "anime-card__btn--remove"
                : "anime-card__btn--add"
            }`}
          >
            {isFavorite(anime.mal_id)
              ? "Delete from favorites"
              : "Add to favorites"}
          </button>
        </section>
      </section>
    </article>
  );
}

export default AnimeCard;
