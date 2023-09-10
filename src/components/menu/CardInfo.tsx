import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  useAddFavoriteMutation,
  useDeleteFavoritesMutation,
} from "../../store/api/userApi";
import { setFavorite, deleteFavorite } from "../../store/userSlice";
import { FavoriteType } from "../favorite/Favorite";

const handleAddFavorite = async (
  product: FavoriteType,
  phone: string,
  addFavorite
) => {
  try {
    await addFavorite({
      product: product,
      phone: phone,
    }).unwrap();
    return true;
  } catch (error) {
    console.error("Failed to add favorite:", error);
    return false;
  }
};
export const handleDeleteFavorite = async (
  id: string,
  phone: string,
  deleteFavorite
) => {
  try {
    await deleteFavorite({ productId: id, phone: phone }).unwrap();
    return true;
  } catch (error) {
    console.error("Failed to delete favorite:", error);
    return false;
  }
};

interface CardInfoProps {
  url: string;
  name: string;
  price: number;
  description: string;
  composition: string;
  kcal: number;
  weight: number;
  fats: number;
  proteins: number;
  carbohydrates: number;
  activeCardRow: number;
  activeCard: string;
  tags: string[];
}

function CardInfo({
  url,
  name,
  price,
  description,
  composition,
  kcal,
  weight,
  fats,
  proteins,
  carbohydrates,
  activeCardRow,
  activeCard,
  tags,
}: CardInfoProps) {
  const [isShowComposition, setIsShowComposition] = useState<boolean>(false);
  const favorites = useAppSelector((state) => state.user.user.favorites);
  const user = useAppSelector((state) => state.user.user);
  const [addFavoriteApi, { isSuccess }] = useAddFavoriteMutation();
  const [deleteFavoriteApi] = useDeleteFavoritesMutation();
  const favoritesDispatch = useAppDispatch();

  const getFavoriteIconPath = () => {
    const isFavorite = favorites.some(
      (item: FavoriteType) => item._id === activeCard
    );
    return isFavorite
      ? "images/icons/favorite-full.png"
      : "images/icons/favorite-transparent.png";
  };

  const handleToggleFavorite = async () => {
    if (favorites.some((item: FavoriteType) => item._id === activeCard)) {
      favoritesDispatch(deleteFavorite(activeCard));
      await handleDeleteFavorite(activeCard, user.phone, deleteFavoriteApi);
    } else {
      const productToFavorite = {
        _id: activeCard,
        url: url,
        name: name,
        tags: tags,
        price: price,
      };

      favoritesDispatch(setFavorite(productToFavorite));
      await handleAddFavorite(productToFavorite, user.phone, addFavoriteApi);
    }
  };

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  return (
    <div
      className="card-info"
      id="card-info"
      style={{
        gridRow: `${activeCardRow < 3 ? 2 : Math.floor(activeCardRow / 3) + 2}`,
      }}
    >
      <img src={url} alt="card-img" />
      <div className="info">
        <p className="name">
          {name}{" "}
          <img
            className="favorite-transparent"
            src={getFavoriteIconPath()}
            alt="favorite-icon"
            onClick={handleToggleFavorite}
          />
        </p>
        <div className="price-count">
          <p className="price">{price} USD</p>

          <div className="add">
            <img src="/images/icons/minus.png" alt="minus-icon" />
            <p className="count">{0} pcs</p>
            <img src="/images/icons/plus.png" alt="plus-icon" />
          </div>
        </div>
        <p className="title">Description</p>
        <p className="description">{description}</p>
        <p
          onClick={() => setIsShowComposition(!isShowComposition)}
          className="title-composition"
        >
          Show composition
        </p>
        {isShowComposition && <p className="composition">{composition}</p>}
        <div className="energy-value">
          <div className="energy-value-item">
            <p>Weight: {weight} g</p>
          </div>
          <div className="energy-value-item ">
            <p>kcal: {kcal}</p>
          </div>
          <div className="energy-value-item ">
            <p>Proteins: {proteins}</p>
          </div>
          <div className="energy-value-item ">
            <p>Fats: {fats}</p>
          </div>
          <div className="energy-value-item ">
            <p>Carbohydrates: {carbohydrates}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardInfo;
