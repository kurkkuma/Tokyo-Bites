import { useState } from "react";
import { useAppSelector } from "../../store/hooks";

interface ISetItem {
  _id: string;
  name: string;
  url: string;
  price: number;
}
function Creator() {
  const [activeCategory, setActiveCategory] = useState<string>("rolls");
  const [activeCells, setActiveCells] = useState<number>(8);
  const [composition, setComposition] = useState<ISetItem[]>([]);
  const products = useAppSelector((state) => state.products.products);

  const categories: string[] = ["rolls", "hot rolls", "sushi", "gunkans"];
  const cells: number[] = [8, 16, 20, 24];

  const filteredProducts = products.filter((product) => {
    switch (activeCategory) {
      case "rolls":
        return product.category === "rolls";
      case "hot rolls":
        return product.category === "hot rolls";
      case "sushi":
        return product.category === "sushi";
      case "gunkans":
        return product.category === "gunkans";
      default:
        return true;
    }
  });

  const handleCellsChange = (newCellsCount: number) => {
    setComposition((prev) => prev.slice(0, newCellsCount));
    setActiveCells(newCellsCount);
  };

  const getPricePerPiece = (description: string, price: number) => {
    const match = description.match(/\((\d+)\s*pcs\.\)/);
    const quantity = match ? parseInt(match[1], 10) : 1;
    const pricePerPiece = price / quantity;
    const roundedPrice = Number.isInteger(pricePerPiece)
      ? pricePerPiece
      : parseFloat(pricePerPiece.toFixed(1));
    return roundedPrice;
  };

  const handleAddToSet = (id: string) => {
    const selectedProduct = filteredProducts.find((item) => item._id === id);

    if (selectedProduct) {
      const existedProductInSet = composition.some((item) => item._id === id);

      const newSetItem: ISetItem = {
        _id: existedProductInSet ? id + Date.now() : id,
        name: selectedProduct.name,
        url: selectedProduct.url,
        price: getPricePerPiece(
          selectedProduct.description,
          selectedProduct.price
        ),
      };

      setComposition((prev) => {
        return prev.length < activeCells ? [...prev, newSetItem] : [...prev];
      });
    }
  };

  const handleDeleteFromSet = (id: string) => {
    setComposition((prev) => prev.filter((item) => item._id !== id));
  };

  const getTotalPrice = () => {
    const total =
      composition.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0) + 10;

    return Number.isInteger(total) ? total : parseFloat(total.toFixed(1));
  };

  return (
    <div className="creator-container">
      <h1 className="creator-title">Create your own unique sushi set</h1>
      <ul className="catalog">
        {categories.map((item, index) => {
          return (
            <li
              className={activeCategory === item ? "active" : ""}
              key={index}
              onClick={() => {
                setActiveCategory(item);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>

      <div className="sushi-group">
        {filteredProducts.map((item) => {
          return (
            <div
              onClick={() => handleAddToSet(item._id)}
              className="sushi-element"
              key={item._id}
            >
              <img src={item.url} alt={item.name} />
              <p>{getPricePerPiece(item.description, item.price)} USD</p>
            </div>
          );
        })}
      </div>

      <div className="playground-container">
        <div className="sets-grid">
          <h3>Select the number of cells in the set</h3>
          <div className="cells">
            {cells.map((item, index) => {
              return (
                <button
                  onClick={() => {
                    handleCellsChange(item);
                  }}
                  className={activeCells === item ? "active cell" : "cell"}
                  key={index}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <div
            className="grid"
            style={{ gridTemplateRows: `repeat(${activeCells / 4}, 1fr)` }}
          >
            {composition.map((item, index) => (
              <img
                key={item._id + index}
                className="set-item"
                src={item.url}
                alt={item.name}
                onClick={() => handleDeleteFromSet(item._id)}
              />
            ))}
            {Array.from({
              length: Math.max(0, activeCells - composition.length),
            }).map((_, index) => (
              <div key={index} className="empty-set-item" />
            ))}
          </div>
        </div>
        <div className="sets-info">
          <h3>Set components:</h3>
          <ul className="components">
            {composition.map((item) => {
              return (
                <li key={item._id}>
                  <p>{item.name}</p>
                  <p>{item.price} USD</p>
                </li>
              );
            })}
            <li>
              <p>Extra</p>
              <p>10 USD</p>
            </li>
          </ul>
          <div className="set-price">
            <p>Total set price:</p>
            <p>{getTotalPrice()} USD</p>
          </div>
          <div className="btn">
            <button className="add-basket-btn">ADD TO BASKET</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Creator;
