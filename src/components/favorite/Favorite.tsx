import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { deleteFavorite } from "../../store/userSlice";

export interface FavoriteType {
  _id: string;
  url: string;
  name: string;
  tags: string[];
  price: number;
}

function Favorite() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const favorites: FavoriteType[] = useAppSelector(
    (state) => state.user.user.favorites
  );
  const favoritesDispatch = useAppDispatch();

  return (
    <div className="favorite-container">
      <h1 className="favorite-title">Your favorites</h1>
      <ul className="favorite-list">
        {favorites.map((item: FavoriteType, index: number) => {
          return (
            <li key={index} className="favorite-item-container">
              <div className="favorite-info">
                <img
                  onClick={() => {
                    favoritesDispatch(deleteFavorite(item._id));
                  }}
                  className="favorite-icon"
                  src={`/images/icons/${
                    isHovered ? "favorite-transparent" : "favorite-full"
                  }.png`}
                  alt="favorite-img"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
                <img
                  className="favorite-img"
                  src={item.url}
                  alt="product-img"
                />
                <p className="favorite-name">{item.name}</p>
                <p className="favorite-tags">
                  {item.tags.map((tag: string) => tag + " ,")}
                </p>
              </div>
              <div className="favorite-price-count">
                <p className="price">{item.price} USD</p>
                <div className="add">
                  <img src="/images/icons/minus.png" alt="minus-icon" />
                  <p className="count">{0} pcs</p>
                  <img src="/images/icons/plus.png" alt="plus-icon" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favorite;
