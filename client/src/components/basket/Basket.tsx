import { useDeleteFromBasketMutation } from "../../store/api/userApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeFromBasket } from "../../store/userSlice";
import BasketUtils from "./basketUtils";
import { handleAmountBasket } from "./basketUtils";

function Basket() {
  const user = useAppSelector((state) => state.user.user);
  const userDispatch = useAppDispatch();
  const [removeFromBasketApi] = useDeleteFromBasketMutation();

  const handleRemoveFromBasket = async (id: string) => {
    userDispatch(removeFromBasket(id));

    try {
      const payload = await removeFromBasketApi({
        userId: user._id,
        productId: id,
      }).unwrap();
      console.log(payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="basket-container">
      <h1 className="basket-title">Your basket</h1>
      <ul className="basket-list">
        {user.basket.map((item) => {
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
