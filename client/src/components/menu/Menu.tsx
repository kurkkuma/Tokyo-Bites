import { useEffect, useState } from "react";
import Card from "./Card";
import CardInfo from "./CardInfo";
import { useAppSelector } from "../../store/hooks";
import { IProduct } from "../../store/productSlice";
import { Link } from "react-router-dom";

function Menu() {
  const products = useAppSelector((state) => state.products.products);

  const [activeCard, setActiveCard] = useState<string>("");
  const [activeCardRow, setActiveCardRow] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>("rolls");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const categories: string[] = [
    "rolls",
    "hot rolls",
    "sushi",
    "gunkans",
    "sets",
  ];
  const tags: string[] = [
    "crab meat",
    "prawn",
    "salmon",
    "eel",
    "avocado",
    "tuna",
    "cheese",
    "snow crab",
  ];

  const handleChangeCategory = (category: string) => {
    setActiveCategory(category);
    setActiveCard("");
  };
  const handleSelectTags = (selectedTag: string) => {
    setActiveTags((prev) => {
      if (prev.includes(selectedTag)) {
        return prev.filter((tag) => tag !== selectedTag);
      } else {
        return [...prev, selectedTag];
      }
    });
  };
  const handleCardClick = (cardId: string, rowIndex: number) => {
    setActiveCard(activeCard === cardId ? "" : cardId);
    setActiveCardRow(rowIndex);
  };

  useEffect(() => {
    const cardInfoElement = document.getElementById("card-info");
    if (cardInfoElement) {
      window.scrollTo({
        left: 0,
        top: cardInfoElement.offsetTop - 150,
      });
    }
  }, [activeCard]);

  const sortedData = [...products].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <>
      <img
        className="menu-sticks"
        src="/images/menu-sticks.png"
        alt="menu-img"
      />
      <div className="menu-container">
        <div className="title-container">
          <p className="title">
            Master the art of your own taste with a unique roll maker! Create
            your masterpieces in the world of sushi with us!
          </p>
          <Link to="/sets-creator">
            <button className="btn-try"></button>
          </Link>
        </div>

        <ul className="catalog">
          {categories.map((item, index) => {
            return (
              <li
                className={activeCategory === item ? "active" : ""}
                key={index}
                onClick={() => handleChangeCategory(item)}
              >
                {item}
              </li>
            );
          })}
        </ul>

        <div className="search-sort-container">
          <div className="search">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              type="text"
            />
            <img src="/images/icons/search.png" alt="search-icon" />
          </div>
          <div
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="sort"
          >
            <p>SORTED BY PRICE</p>
            <img
              className={sortOrder === "asc" ? "mirror" : ""}
              src="/images/icons/sort.png"
              alt="sort-icon"
            />
          </div>
        </div>

        <div className="filter">
          {tags.map((item: string, index: number) => {
            return (
              <div
                onClick={() => handleSelectTags(item)}
                className={`filter-item ${
                  activeTags.includes(item) ? "active" : ""
                }`}
                key={index}
              >
                <p>{item}</p>
              </div>
            );
          })}
        </div>

        <div className="menu">
          {products
            .filter((item: IProduct) => item._id === activeCard)
            .map((item: IProduct) => {
              return (
                <CardInfo
                  key={item._id}
                  _id={item._id}
                  url={item.url}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  composition={item.composition}
                  kcal={item.kcal}
                  weight={item.weight}
                  proteins={item.proteins}
                  fats={item.fats}
                  carbohydrates={item.carbohydrates}
                  activeCardRow={activeCardRow}
                  activeCard={activeCard}
                  tags={item.tags}
                  category={item.category}
                />
              );
            })}
          {sortedData
            .filter((item: IProduct) => item.category === activeCategory)
            .filter((item: IProduct) => {
              if (activeTags.length === 0) {
                return true;
              } else {
                return activeTags.every((tag) => item.tags.includes(tag));
              }
            })
            .filter((item: IProduct) => {
              if (searchQuery.length > 0) {
                return item.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase().trim());
              }
              return true;
            })
            .map((item: IProduct, index: number) => {
              return (
                <Card
                  key={item._id}
                  id={item._id}
                  url={item.url}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  activeCard={activeCard}
                  handleCardClick={handleCardClick}
                  rowIndex={index}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Menu;
