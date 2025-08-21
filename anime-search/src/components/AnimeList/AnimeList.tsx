import React, { useState } from "react";
import type { Anime } from "../../types/anime";
import AnimeCard from "../AnimeCard/AnimeCard";
import Modal from "../Modal/Modal";

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
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (anime: Anime) => {
    setSelectedAnime(anime);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAnime(null);
  };

  if (animes.length === 0) {
    return <p className="no-results">No anime found. Please try again.</p>;
  }

  return (
    <React.Fragment>
      <ul className="anime-list">
        {animes.map((anime) => (
          <li className="anime-list__item" key={anime.mal_id}>
            <AnimeCard
              anime={anime}
              variant={variant}
              onRemoveFavorite={onRemoveFavorite}
              onAddFavorite={onAddFavorite}
              onOpenModal={variant === "compact" ? handleOpenModal : undefined}
            />
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedAnime && (
          <AnimeCard
            anime={selectedAnime}
            variant="detailed"
            onRemoveFavorite={onRemoveFavorite}
            onAddFavorite={onAddFavorite}
          />
        )}
      </Modal>
    </React.Fragment>
  );
}

export default AnimeList;
