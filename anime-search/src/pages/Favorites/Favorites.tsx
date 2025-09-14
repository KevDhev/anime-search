import { useFavorites } from "../../hooks/useFavorites";
import AnimeList from "../../components/AnimeList/AnimeList";
import "./Favorites.css";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <section className="favorites-page">
      <h2 className="favorite-title">Your favorite animes</h2>

      {favorites.length > 0 ? (
        <AnimeList animes={favorites} variant="compact" />
      ) : (
        <p className="favorite-no-results">
          You don't have saved animes. Add some from the search!
        </p>
      )}
    </section>
  );
}

export default Favorites;
