import type { Anime } from "../../types/anime";
import AnimeCard from "../AnimeCard/AnimeCard";

interface Props {
  animes: Anime[]; // Receive the list of anime as a prop
  variant?: "detailed" | "compact";
  onRemoveFavorite?: (animeId: number) => void;
  onAddFavorite?: (anime: Anime) => void;
}

function AnimeList({
  animes,
  variant = "compact",
  onRemoveFavorite,
  onAddFavorite,
}: Props) {
  if (animes.length === 0) {
    return <p className="no-results">No anime found. Please try again.</p>;
  }

  return (
    <ul className="anime-list">
      {animes.map((anime) => (
        <li className="anime-list__item" key={anime.mal_id}>
          <AnimeCard
            anime={anime}
            variant={variant}
            onRemoveFavorite={onRemoveFavorite}
            onAddFavorite={onAddFavorite}
          />
        </li>
      ))}
    </ul>
  );
}

export default AnimeList;
