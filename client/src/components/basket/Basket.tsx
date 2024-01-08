import { useAppSelector } from "../../store/hooks";
import BasketUtils from "./basketUtils";

function Basket() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="basket-container">
      <h1 className="basket-title">Your basket</h1>
      <ul className="basket-list">
        {user.basket.map((item) => {
          return (
            <li key={item._id} className="favorite-item-container">
              <div className="favorite-info">
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
              <div className="favorite-price-count">
                <p className="price">{item.price} USD</p>
                <div className="add">
                  <img src="/images/icons/minus.png" alt="minus-icon" />
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
      </ul>
      <button className="btn-try"></button>
    </div>
  );
}

export default Basket;
