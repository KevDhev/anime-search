import { useFavorites } from "../../hooks/useFavorites";
import AnimeList from "../../components/AnimeList/AnimeList";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <section className="favorites-page">
      <h2>Your favorite anime</h2>

      {favorites.length > 0 ? (
        <AnimeList animes={favorites} variant="compact" />
      ) : (
        <p>You don't have saved anime. Add some from the search!</p>
      )}
    </section>
  );
}

export default Favorites;
