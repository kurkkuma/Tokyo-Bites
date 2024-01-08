import BasketUtils from "../basket/basketUtils";

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
    <div className={`card ${id === activeCard ? "active" : ""}`}>
      <div
        className="card-info-container"
        onClick={() => handleCardClick(id, rowIndex)}
      >
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
        <BasketUtils id={id}>
          {(handleAddToBasket) => {
            return (
              <button onClick={handleAddToBasket} className="add-basket-btn">
                ADD TO BASKET
              </button>
            );
          }}
        </BasketUtils>
      </div>
    </div>
  );
}

export default Card;
