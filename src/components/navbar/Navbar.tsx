import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import BurgerMenu from "./BurgerMenu";

function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user.user);

  const handleOpenMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const menuItems: string[] = [
    "menu",
    "basket",
    "favorite",
    "profile",
    "about",
    "contests",
    "chat",
  ];

  return (
    <div className="navbar">
      <img
        onClick={handleOpenMenu}
        className="menu-bar"
        src="/images/icons/menu.png"
        alt="menu-bar"
      />

      <BurgerMenu menuItems={menuItems} isOpenMenu={isOpenMenu} />

      <h1 className="title">Tokyo Bites</h1>
      <div className="icons">
        <img
          className="favotite"
          src="/images/icons/favorite.png"
          alt="favorite"
        />
        <img className="basket" src="/images/icons/basket.png" alt="basket" />
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
