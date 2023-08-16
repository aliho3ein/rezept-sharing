import { FC } from "react";
import style from "./../../styles/startPage/nav.module.scss";
import { Link } from "react-router-dom";

const NavBar: FC = () => {
  return (
    <nav className={style.navbar}>
      <ul>
        <li>How to use?</li>
        <li>Über uns</li>
        <li>Kontakt uns</li>
        <li>
          <Link to="/anmelden"> Anmelden</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
