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
          <Link
            className={`menu-link ${isOpenMenu ? "menu-open" : "menu-close"}`}
            key={index}
            to={`/${item}`}
          >
            <li>{item}</li>
          </Link>
        );
      })}
    </ul>
  );
}

export default BurgerMenu;
