import React, { useState } from "react";
import Card from "./Card";
import CardInfo from "./CardInfo";
import { useGetProductsQuery } from "../../store/api/productsApi";
import loading from "/images/loading.gif";

interface ProductType {
  url: string;
  name: string;
  price: number;
  description: string;
  composition: string;
  category: string;
  kcal: number;
  weight: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  tags: string[];
}

function Menu() {
  const { data = [], isLoading, isError } = useGetProductsQuery({});
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("rolls");

  const categories: string[] = [
    "rolls",
    "hot rolls",
    "sushi",
    "gunkans",
    "sets",
  ];
  const handleChangeCategory = (category: string) => {
    setActiveCategory(category);
  };
  return (
    <>
      <img
        className="menu-sticks"
        src="/images/menu-sticks.png"
        alt="menu-img"
      />
      <div className="menu-container">
        <div className="animation">
          <div className="upper">Make your perfect sushi!</div>
          <div className="lower">Make your perfect sushi!</div>
          <div className="inside">TRY</div>
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
            <input type="text" />
            <img src="/images/icons/search.png" alt="search-icon" />
          </div>
          <div className="sort">
            <p>SORTED BY PRICE</p>
            <img src="/images/icons/sort.png" alt="sort-icon" />
          </div>
        </div>
        <div className="filter">
          <div className="filter-item">
            <p>salmon</p>
          </div>
          <div className="filter-item active">
            <p>salmon</p>
          </div>
          <div className="filter-item">
            <p>salmon</p>
          </div>
          <div className="filter-item active">
            <p>salmon</p>
          </div>
          <div className="filter-item">
            <p>salmon</p>
          </div>
          <div className="filter-item">
            <p>salmon</p>
          </div>
          <div className="filter-item">
            <p>salmon</p>
          </div>
          <div className="filter-item active">
            <p>salmon</p>
          </div>
          <div className="filter-item">
            <p>salmon</p>
          </div>
          <div className="filter-item active">
            <p>salmon</p>
          </div>
          <div className="filter-item">
            <p>salmon</p>
          </div>
          <div className="filter-item">
            <p>salmon</p>
          </div>
        </div>
        {isLoading && (
          <img
            src={loading}
            style={{ width: "2rem", height: "2rem", marginTop: "2rem" }}
          />
        )}
        {isError && <p className="error">Error! Please, try again</p>}
        <div className="menu">
          {/* <CardInfo key={index}
                url={item.url}
                name={item.name}
                price={item.price}
                description={item.description}
                composition={item.composition}
                category={item.category}
                kcal={item.kcal}
                weight={item.weight}
                proteins={item.proteins}
                fats={item.fats}
                carbohydrates={item.carbohydrates}
                tags={item.tags} /> */}
          {data
            .filter((item: ProductType) => item.category === activeCategory)
            .map((item: ProductType, index: number) => {
              return (
                <Card
                  key={index}
                  index={index}
                  url={item.url}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  setActiveCard={setActiveCard}
                  activeCard={activeCard}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Menu;
