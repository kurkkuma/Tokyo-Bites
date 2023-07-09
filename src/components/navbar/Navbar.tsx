import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <img className="menu-bar" src="/images/icons/menu.png" alt="menu-bar" />
      <h1 className="title">Tokyo Bites</h1>
      <div className="icons">
        <img
          className="favotite"
          src="/images/icons/favorite.png"
          alt="favorite"
        />
        <img className="basket" src="/images/icons/basket.png" alt="basket" />
        <img className="avatar" src="/images/icons/avatar.png" alt="avatar" />
      </div>
    </div>
  );
}

export default Navbar;
