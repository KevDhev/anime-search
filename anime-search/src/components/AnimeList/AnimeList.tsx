import type { Anime } from "../../types/anime";
import { addFavorite } from "../../utils/localStorage";

interface Props {
  animes: Anime[]; // Receive the list of anime as a prop
  onRemoveFavorite?: (animeId: number) => void;
}

function AnimeList({ animes, onRemoveFavorite }: Props) {
  const handleAddToFavorites = (anime: Anime) => {
    addFavorite(anime);
    alert(`${anime.title} has been added to favorites!`);
  };

  return (
    <ul className="anime-list">
      {animes.length === 0 ? (
        <li className="no-results">No anime found. Please try again.</li>
      ) : (
        animes.map((anime) => (
          <li className="anime-card" key={anime.mal_id}>
            <img
              src={anime.images.jpg.image_url}
              alt={`Cover of ${anime.title}`}
              className="anime-image"
            />
            <h2 className="anime-title">{anime.title}</h2>

            {onRemoveFavorite ? (
              <button
                className="remove-btn"
                onClick={() => onRemoveFavorite(anime.mal_id)}
              >
                Remove from favorites
              </button>
            ) : (
              <button
                className="favorite-btn"
                onClick={() => handleAddToFavorites(anime)}
              >
                Add to favorites
              </button>
            )}
          </li>
        ))
      )}
    </ul>
  );
}

export default AnimeList;
