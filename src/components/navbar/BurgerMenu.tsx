import React from "react";
import { Link } from "react-router-dom";

type MenuItem = string;

interface BurgerMenuProps {
  menuItems: MenuItem[];
  isOpenMenu: boolean;
}

function BurgerMenu({ menuItems, isOpenMenu }: BurgerMenuProps) {
  return (
    <ul className="burger-menu">
      {menuItems.map((item: string, index: number) => {
        return (
          <li
            className={`${isOpenMenu ? "menu-open" : "menu-close"}`}
            key={index}
          >
            <Link className="menu-link" to={`/${item}`}>
              {item}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default BurgerMenu;
