function Basket() {
  return (
    <div className="basket-container">
      <h1 className="basket-title">Your basket</h1>
      <ul className="basket-list">
        <li className="favorite-item-container">
          <div className="favorite-info">
            <img
              className="favorite-img"
              src="/images/products/06c014e8c2ebf22fa7feb4491a03b0e1.jpg"
              alt="product-img"
            />
            <p className="favorite-name">Item name</p>
            <p className="favorite-tags">
              {/* {item.tags.map((tag: string, index: number) =>
                    index === item.tags.length - 1 ? tag : tag + ", "
                  )} */}
              tags tags tags tags
            </p>
          </div>
          <div className="favorite-price-count">
            <p className="price">73 USD</p>
            <div className="add">
              <img src="/images/icons/minus.png" alt="minus-icon" />
              <p className="count">0 pcs</p>
              <img src="/images/icons/plus.png" alt="plus-icon" />
            </div>
          </div>
        </li>
      </ul>
      <img
        className="sushi-photo"
        src="/images/basket-sushi.png"
        alt="sushi photo"
      />
    </div>
  );
}

export default Basket;
