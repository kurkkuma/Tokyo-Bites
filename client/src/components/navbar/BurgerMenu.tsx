import { Link } from "react-router-dom";

interface BurgerMenuProps {
  menuItems: string[];
  isOpenMenu: boolean;
  menuRef: any;
}

function BurgerMenu({ menuItems, isOpenMenu, menuRef }: BurgerMenuProps) {
  return (
    <ul ref={menuRef} className="burger-menu">
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
