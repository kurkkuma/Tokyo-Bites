import { useState } from "react";
import { useDeleteFromBasketMutation } from "../../store/api/userApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IBasketItem, removeFromBasket } from "../../store/userSlice";
import BasketUtils, { ISet } from "./basketUtils";
import { handleAmountBasket } from "./basketUtils";

function Basket() {
  const user = useAppSelector((state) => state.user.user);
  const userDispatch = useAppDispatch();
  const [removeFromBasketApi] = useDeleteFromBasketMutation();
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const handleRemoveFromBasket = async (id: string) => {
    userDispatch(removeFromBasket(id));

    try {
      await removeFromBasketApi({
        userId: user._id,
        productId: id,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const { basketItems, setItems } = user.basket.reduce(
    (acc, currentItem) => {
      if ("url" in currentItem) {
        //@ts-ignore
        acc.basketItems.push(currentItem);
      } else {
        acc.setItems.push(currentItem);
      }
      return acc;
    },
    { basketItems: [] as IBasketItem[], setItems: [] as ISet[] }
  );

  return (
    <div className="basket-container">
      <h1 className="basket-title">Your basket</h1>
      <ul className="basket-list">
        {basketItems.map((item) => {
          return (
            <li key={item._id} className="basket-item-container">
              <div className="basket-info">
                <img className="basket-img" src={item.url} alt="product-img" />
                <p className="basket-name">{item.name}</p>
                <p className="basket-tags">
                  {item.tags.map((tag: string, index: number) =>
                    index === item.tags.length - 1 ? tag : tag + ", "
                  )}
                </p>
              </div>
              <div className="basket-price-count">
                <p className="price">{item.price} USD</p>
                <div className="add">
                  <img
                    onClick={() => handleRemoveFromBasket(item._id)}
                    src="/images/icons/minus.png"
                    alt="minus-icon"
                  />
                  <p className="count">{item.count} pcs</p>
                  <BasketUtils id={item._id}>
                    {(handleAddToBasket) => {
                      return (
                        <img
                          onClick={handleAddToBasket}
                          src="/images/icons/plus.png"
                          alt="plus-icon"
                        />
                      );
                    }}
                  </BasketUtils>
                </div>
              </div>
            </li>
          );
        })}
        {setItems.map((item) => {
          return (
            <div key={item._id}>
              <li className="basket-item-container">
                <div className="basket-set-info-container">
                  <div className="main-set-info">
                    <p className="basket-name">{item.name}</p>
                    <img
                      onClick={() => setIsInfoOpen((prev) => !prev)}
                      className="arrow-down"
                      src="/images/icons/caret-down.png"
                      alt="more info arrow"
                    />
                  </div>
                </div>
                <div className="basket-price-count">
                  <p className="price">{item.price} USD</p>
                  <div className="add">
                    <img
                      onClick={() => handleRemoveFromBasket(item._id)}
                      src="/images/icons/minus.png"
                      alt="minus-icon"
                    />
                    <p className="count">{item.count} pcs</p>
                    <BasketUtils id={item._id}>
                      {(handleAddToBasket) => {
                        return (
                          <img
                            onClick={handleAddToBasket}
                            src="/images/icons/plus.png"
                            alt="plus-icon"
                          />
                        );
                      }}
                    </BasketUtils>
                  </div>
                </div>
              </li>
              {isInfoOpen && (
                <ul className="more-set-info">
                  {item.composition.map((item) => {
                    return (
                      <li key={item._id} className="more-info-item">
                        <p>{item.name}</p>
                        <p>{item.price} USD</p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </ul>
      <div className="price-amount">
        <p>Total price: </p>
        <p>{handleAmountBasket(user.basket)} USD</p>
      </div>
      <button className="btn-try"></button>
    </div>
  );
}

export default Basket;
