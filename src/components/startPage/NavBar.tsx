import { FC } from "react";
import style from "./../../styles/startPage/nav.module.scss";
import { Link } from "react-router-dom";

const NavBar: FC = () => {
  return (
    <nav className={style.navbar}>
      <ul>
        <li>
          <Link to="/">How to use?</Link>
        </li>

        <li>
          <a href="#about">Über uns</a>
        </li>
        <li>
          <a href="#contact">Kontakt uns</a>
        </li>
        <li>
          <Link to="/signin">Anmelden</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
