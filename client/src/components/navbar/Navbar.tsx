import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import BurgerMenu from "./BurgerMenu";

function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user.user);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const handleOutsideClick = (event: { target: any }) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpenMenu(false);
    }
  };

  const handleOpenMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const menuItems: string[] = [
    "about",
    "menu",
    "basket",
    "favorite",
    "profile",
  ];

  return (
    <div className="navbar">
      <img
        onClick={handleOpenMenu}
        className="menu-bar"
        src="/images/icons/menu.png"
        alt="menu-bar"
      />

      <BurgerMenu
        menuRef={menuRef}
        menuItems={menuItems}
        isOpenMenu={isOpenMenu}
      />

      <h1 className="title">Tokyo Bites</h1>

      <div className="icons">
        <div className="basket-container">
          <p className="basket-info">0 pcs | 0 USD</p>
          <img className="basket" src="/images/icons/basket.png" alt="basket" />
        </div>

        <Link to="/favorite">
          <img
            className="favorite"
            src="/images/icons/favorite.png"
            alt="favorite"
          />
        </Link>

        <Link to="/profile">
          <img
            className="avatar"
            src={
              user.name.length > 0 &&
              user.phone.length === 13 &&
              user.address.length > 0
                ? "/images/icons/avatar.png"
                : "/images/icons/avatar-warning.png"
            }
            alt="avatar"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
