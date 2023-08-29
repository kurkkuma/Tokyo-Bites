import React, { useState } from "react";

interface CardProps {
  id: string;
  url: string;
  name: string;
  price: number;
  description: string;
  activeCard: string | null;
  rowIndex: number;
  handleCardClick: (arg1: string, arg2: number) => void;
}

function Card({
  id,
  url,
  name,
  price,
  description,
  handleCardClick,
  activeCard,
  rowIndex,
}: CardProps) {
  return (
    <div
      className={`card ${id === activeCard ? "active" : ""}`}
      onClick={() => handleCardClick(id, rowIndex)}
    >
      <div className="card-info-container">
        <img src={url} alt="card-img" />
        <p className="name">{name}</p>
        <p className="description">
          {description.length <= 55
            ? description
            : `${description.slice(0, 55).trim()}...`}
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
