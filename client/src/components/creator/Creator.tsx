import React, { useState } from "react";

function Creator() {
  const [activeCategory, setActiveCategory] = useState<string>("rolls");
  const [activeCells, setActiveCells] = useState<number>(8);

  const categories: string[] = ["rolls", "hot rolls", "sushi", "gunkans"];
  const cells: number[] = [8, 16, 20, 24];

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
      <div className="sushi-list-container">
        <img src="/images/icons/arrow-left.png" alt="left-arrow" />
        <ul className="sushi-list"></ul>
        <img src="/images/icons/arrow-right.png" alt="left-arrow" />
      </div>
      <div className="playground-container">
        <div className="sets-grid">
          <h3>Select the number of cells in the set</h3>
          <div className="cells">
            {cells.map((item, index) => {
              return (
                <button
                  onClick={() => {
                    setActiveCells(item);
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
            <img
              className="set-item"
              src="/images/products/52d3221ed2c4861ff92b79b3e29ab5e1.jpg"
              alt=""
            />
            <img
              className="set-item"
              src="/images/products/52d3221ed2c4861ff92b79b3e29ab5e1.jpg"
              alt=""
            />
            <img
              className="set-item"
              src="/images/products/52d3221ed2c4861ff92b79b3e29ab5e1.jpg"
              alt=""
            />
            <img
              className="set-item"
              src="/images/products/52d3221ed2c4861ff92b79b3e29ab5e1.jpg"
              alt=""
            />
            <img
              className="set-item"
              src="/images/products/52d3221ed2c4861ff92b79b3e29ab5e1.jpg"
              alt=""
            />
            <img
              className="set-item"
              src="/images/products/52d3221ed2c4861ff92b79b3e29ab5e1.jpg"
              alt=""
            />
            <img
              className="set-item"
              src="/images/products/52d3221ed2c4861ff92b79b3e29ab5e1.jpg"
              alt=""
            />
            <img className="add-set-item" src="/images/icons/add.png" alt="" />
          </div>
        </div>
        <div className="sets-info">
          <h3>Set components:</h3>
          <ul className="components">
            <li>
              <p>Lorem, ipsum.</p>
              <p>2 USD</p>
            </li>
            <li>
              <p>Lorem, ipsum.</p>
              <p>2 USD</p>
            </li>
            <li>
              <p>Lorem, ipsum.</p>
              <p>2 USD</p>
            </li>
            <li>
              <p>Lorem, ipsum.</p>
              <p>2 USD</p>
            </li>
            <li>
              <p>Lorem, ipsum.</p>
              <p>2 USD</p>
            </li>
            <li>
              <p>Extra</p>
              <p>10 USD</p>
            </li>
          </ul>
          <div className="set-price">
            <p>Total set price:</p>
            <p>36 USD</p>
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
