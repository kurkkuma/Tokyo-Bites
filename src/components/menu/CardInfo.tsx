import { useState } from "react";

interface CardInfoProps {
  url: string;
  name: string;
  price: number;
  description: string;
  composition: string;
  kcal: number;
  weight: number;
  fats: number;
  proteins: number;
  carbohydrates: number;
  activeCardRow: number;
  cardId: string;
}

function CardInfo({
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
}: CardInfoProps) {
  const [isShowComposition, setIsShowComposition] = useState<boolean>(false);

  return (
    <div
      className="card-info"
      id="card-info"
      style={{
        gridRow: `${activeCardRow < 3 ? 2 : Math.floor(activeCardRow / 3) + 2}`,
      }}
    >
      <img src={url} alt="card-img" />
      <div className="info">
        <p className="name">
          {name}{" "}
          <img
            className="favorite-transparent"
            src="images/icons/favorite-transparent.png"
            alt=""
          />
        </p>
        <div className="price-count">
          <p className="price">{price} USD</p>
          <div className="add">
            <img src="/images/icons/minus.png" alt="minus-icon" />
            <p className="count">{0} pcs</p>
            <img src="/images/icons/plus.png" alt="plus-icon" />
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
