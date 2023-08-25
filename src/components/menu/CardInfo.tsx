import React from "react";

function CardInfo() {
  return (
    <div className="card-info" style={{ gridRow: `${1}` }}>
      <img src="/images/sushi/sushi1.jpg" alt="card-img" />
      <div className="info">
        <p className="name">Name sushi</p>
        <div className="price-count">
          <p className="price">12 USD</p>
          <div className="add">
            <img src="/images/icons/minus.png" alt="minus-icon" />
            <p className="count">2 pcs</p>
            <img src="/images/icons/plus.png" alt="plus-icon" />
          </div>
        </div>
        <p className="title">Description</p>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
          perferendis quo iusto recusandae quos cum ipsa pariatur a fugit nemo
          in, consectetur sequi est sit, consequuntur{" "}
        </p>
        <p className="title">Show composition</p>
        <p className="composition">
          pshrimp tempura, spicy tuna and salmon tartare, truffle oil, avocado,
          tempura and tobiko, wasabi (9 pcs.)shrimp tempura, spicy tuna and
          salmon tartare, truffle oil, avocado, tempura and tobiko, wasabi (9
          pcs.)shrimp tempura, spicy tuna and salmon tartare, truffle oil,
          avocado, tempura and tobiko, wasabi (9 pcs.)
        </p>
      </div>
    </div>
  );
}

export default CardInfo;
