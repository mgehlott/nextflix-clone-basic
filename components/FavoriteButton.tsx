import userCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import React, { useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import axios from "axios";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = userCurrentUser();
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoritesIds || [];
    return list.includes(movieId);
  }, [movieId, currentUser]);

  const toggleFavorites = async () => {
    let response;
    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }
    const updatedFavoritesIds = response?.data?.favoritesIds;
    mutate({ ...currentUser, favoritesIds: updatedFavoritesIds });
    mutateFavorites();
  };
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      className="
    cursor-pointer
    group/item
    w-6
    h-6
    lg:w-10
    lg:h-10
    border-white
    border-2
    rounded-full
    flex
    justify-center
    items-center
    transition
    hover:border-neutral-100
    "
      onClick={toggleFavorites}
    >
      <Icon />
    </div>
  );
};
export default FavoriteButton;
