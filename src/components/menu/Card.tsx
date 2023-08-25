import React, { useState } from "react";

interface CardProps {
  index: number;
  url: string;
  name: string;
  price: number;
  description: string;
  setActiveCard: (arg: number | null) => void;
  activeCard: number | null;
}

function Card({
  index,
  url,
  name,
  price,
  description,
  setActiveCard,
  activeCard,
}: CardProps) {
  const handleChangeCard = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <div
      className={`card ${index === activeCard ? "active" : ""}`}
      onClick={() => handleChangeCard(index)}
    >
      <div className="card-info-container">
        <img src={url} alt="card-img" />
        <p className="name">{name}</p>
        <p className="description">
          {description.length <= 55
            ? description
            : `${description.slice(0, 55)}...`}
        </p>
      </div>

      <div className="price-count">
        <p className="price">{price} USD</p>
        <div className="add">
          <img src="/images/icons/minus.png" alt="minus-icon" />
          <p className="count">0 pcs</p>
          <img src="/images/icons/plus.png" alt="plus-icon" />
        </div>
      </div>
    </div>
  );
}

export default Card;
