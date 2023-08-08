import { FC } from "react";
import style from "./../../styles/startPage/nav.module.scss";

const NavBar: FC = () => {
  return (
    <nav className={style.navbar}>
      <ul>
        <li>How to use?</li>
        <li>Über uns</li>
        <li>Kontakt uns</li>
        <li>Anmelden</li>
      </ul>
    </nav>
  );
};

export default NavBar;
