import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  useAddToBasketMutation,
  useDeleteFavoriteMutation,
} from "../../store/api/userApi";
import {
  IBasketItem,
  IFavoriteItem,
  addToBasket,
  deleteFavorite,
} from "../../store/userSlice";

function Favorite() {
  const user = useAppSelector((state) => state.user.user);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [deleteFavoriteApi] = useDeleteFavoriteMutation();
  const [addTobasketApi] = useAddToBasketMutation();
  const userDispatch = useAppDispatch();

  const handleDeleteFavorite = async (id: string) => {
    try {
      const payload = await deleteFavoriteApi({
        userId: user._id,
        productId: id,
      }).unwrap();

      if (payload.message === "deleted favorite product") {
        userDispatch(deleteFavorite(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToBasket = async (id: string) => {
    const favoriteItem: IFavoriteItem | undefined = user.favorites.find(
      (item: IFavoriteItem) => item._id === id
    );

    if (favoriteItem) {
      const existBasketItem = user.basket.find((item) => item._id === id);

      const newBasketItem: IBasketItem = {
        ...favoriteItem,
        count: existBasketItem ? existBasketItem.count + 1 : 1,
      };

      userDispatch(addToBasket(newBasketItem));

      try {
        const payload = await addTobasketApi({
          userId: user._id,
          newBasketItem,
        }).unwrap();
        console.log(payload);
      } catch (error) {
        console.log(error);
      }
    }

    // if (favoriteItem) {
    //   const existBasketItem = user.basket.find((item) => item._id === id);

    //   const updatedBasketItem = existBasketItem
    //     ? { ...existBasketItem, count: existBasketItem.count + 1 }
    //     : { ...favoriteItem, count: 1 };

    //   userDispatch(addToBasket(updatedBasketItem));

    //   try {
    //     const payload = await addTobasketApi({
    //       userId: user._id,
    //       newBasketItem: updatedBasketItem,
    //     }).unwrap();
    //     console.log(payload);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  return (
    <div className="favorite-container">
      <h1 className="favorite-title">Your favorites</h1>

      <ul className="favorite-list">
        {user.favorites.map((item, index: number) => {
          const isHovered = hoveredItem === item._id;
          return (
            <li key={index} className="favorite-item-container">
              <div className="favorite-info">
                <img
                  className="favorite-icon"
                  src={`/images/icons/${
                    isHovered ? "favorite-transparent" : "favorite-full"
                  }.png`}
                  alt="favorite-img"
                  onMouseEnter={() => setHoveredItem(item._id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleDeleteFavorite(item._id)}
                />
                <img
                  className="favorite-img"
                  src={item.url}
                  alt="product-img"
                />
                <p className="favorite-name">{item.name}</p>
                <p className="favorite-tags">
                  {item.tags.map((tag: string, index: number) =>
                    index === item.tags.length - 1 ? tag : tag + ", "
                  )}
                </p>
              </div>
              <div className="add-basket-container">
                <p className="price">{item.price} USD</p>
                <img
                  onClick={() => handleAddToBasket(item._id)}
                  className="add-basket"
                  src="/images/icons/add-basket.png"
                  alt="add to basket icon"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favorite;
