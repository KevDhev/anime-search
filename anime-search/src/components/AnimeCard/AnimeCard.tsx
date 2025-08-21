import type { Anime } from "../../types/anime";

interface Props {
  anime: Anime;
  variant?: "detailed" | "compact";
  onRemoveFavorite?: (animeId: number) => void;
  onAddFavorite?: (anime: Anime) => void;
}

function AnimeCard({
  anime,
  variant = "compact",
  onRemoveFavorite,
  onAddFavorite,
}: Props) {
  // Add to favorites
  const handleAddFavorite = () => {
    if (onAddFavorite) onAddFavorite(anime);
  };

  // Remove from favorites
  const handleRemoveFavorite = () => {
    if (onRemoveFavorite) onRemoveFavorite(anime.mal_id);
  };

  return (
    <article className={`anime-card anime-card--${variant}`}>
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
          {onRemoveFavorite ? (
            <button className="btn btn-remove" onClick={handleRemoveFavorite}>
              Remove from favorites
            </button>
          ) : (
            <button className="btn btn-add" onClick={handleAddFavorite}>
              Add to Favorites
            </button>
          )}
        </section>
      </section>
    </article>
  );
}

export default AnimeCard;
