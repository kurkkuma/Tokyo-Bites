import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addToFavorite,
  deleteFavorite,
  IFavoriteItem,
} from "../../store/userSlice";
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from "../../store/api/userApi";
import { IProduct } from "../../store/productSlice";
import BasketUtils from "../basket/basketUtils";
interface CardInfoProps extends IProduct {
  activeCardRow: number;
  activeCard: string;
}

function CardInfo({
  _id,
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
  const user = useAppSelector((state) => state.user.user);
  const [isShowComposition, setIsShowComposition] = useState<boolean>(false);
  const [addFavoriteApi] = useAddFavoriteMutation();
  const [deleteFavoriteApi] = useDeleteFavoriteMutation();
  const userDispatch = useAppDispatch();

  const existenceCheck = (): boolean => {
    return user.favorites.some((item) => item._id === activeCard);
  };

  const handleFailureAdd = (id: string) => {
    userDispatch(deleteFavorite(id));
  };

  const handleFailureDelete = (product: IFavoriteItem) => {
    userDispatch(addToFavorite(product));
  };

  const handleToggleFavorite = async () => {
    try {
      const newFavorite = {
        _id: activeCard,
        url,
        name,
        price,
        tags,
      };

      if (existenceCheck()) {
        userDispatch(deleteFavorite(activeCard));

        const payload = await deleteFavoriteApi({
          userId: user._id,
          productId: activeCard,
        }).unwrap();

        if (payload.message !== "deleted favorite product") {
          handleFailureDelete(newFavorite);
        }
      } else {
        userDispatch(addToFavorite(newFavorite));
        const payload = await addFavoriteApi({
          userId: user._id,
          newFavorite,
        }).unwrap();
        if (payload.message !== "added new favorite product") {
          handleFailureAdd(activeCard);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={_id}
      className="card-info"
      id="card-info"
      style={{
        gridRow: `${activeCardRow < 3 ? 2 : Math.floor(activeCardRow / 3) + 2}`,
      }}
    >
      <img src={url} alt="card-img" />
      <div className="info">
        <p className="name">
          {name}
          <img
            className="favorite-transparent"
            src={
              existenceCheck()
                ? "/images/icons/favorite-full.png"
                : "/images/icons/favorite-transparent.png"
            }
            alt="favorite-icon"
            onClick={handleToggleFavorite}
          />
        </p>
        <div className="price-count">
          <p className="price">{price} USD</p>

          <div className="add">
            <BasketUtils id={_id}>
              {(handleAddToBasket) => {
                return (
                  <button
                    onClick={handleAddToBasket}
                    className="add-basket-btn"
                  >
                    ADD TO BASKET
                  </button>
                );
              }}
            </BasketUtils>
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
