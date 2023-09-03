import React from "react";
import { useAppSelector } from "../../store/hooks";

function Favorite() {
  const favorites = useAppSelector((state) => state.favorites.favorites);
  return (
    <div className="favorite-container">
      <h1 className="favorite-title">Your favorites</h1>
      <ul className="favorite-list">
        {favorites.map((item, index) => {
          return (
            <li key={index} className="favorite-item-container">
              <div className="favorite-info">
                <img
                  className="favorite-icon"
                  src="/images/icons/favorite-full.png"
                  alt="favorite-img"
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
        {/* <li className="favorite-item-container">
          <div className="favorite-info">
            <img
              className="favorite-icon"
              src="/images/icons/favorite-full.png"
              alt="favorite-img"
            />
            <img
              className="favorite-img"
              src="/images/products/d634ea33403908fe79e679d2e9d1efff.jpg"
              alt="product-img"
            />
            <p className="favorite-name">SUSHI NAME</p>
            <p className="favorite-tags">tags for this sushi</p>
          </div>
          <div className="favorite-price-count">
            <p className="price">Price USD</p>
            <div className="add">
              <img src="/images/icons/minus.png" alt="minus-icon" />
              <p className="count">{0} pcs</p>
              <img src="/images/icons/plus.png" alt="plus-icon" />
            </div>
          </div>
        </li> */}
      </ul>
    </div>
  );
}

export default Favorite;
