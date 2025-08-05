import type { Anime } from "../../types/anime";

interface Props {
  animes: Anime[]; // Receive the list of anime as a prop
}

function AnimeList({ animes }: Props) {
  const handleAnimeClick = (animeId: number) => {
    // browse or add to favorites
    console.log(animeId);
  };

  return (
    <ul className="anime-list">
      {animes.length === 0 ? (
        <li className="no-results">No anime found. Please try again.</li>
      ) : (
        animes.map((anime) => (
          <li
            className="anime-card"
            key={anime.mal_id}
            onClick={() => handleAnimeClick(anime.mal_id)}
          >
            <img
              src={anime.images.jpg.image_url}
              alt={`Cover of ${anime.title}`}
              className="anime-image"
            />
            <h2 className="anime-title">{anime.title}</h2>
          </li>
        ))
      )}
    </ul>
  );
}

export default AnimeList;
