import { FC } from "react";

import style from "./../../styles/startPage/header.module.scss";
import NavBar from "./NavBar";

const Header: FC = () => {
  return (
    <header className={style.startHeader}>
      <div className={style.leftSide}></div>
      <div className={style.rightSide}>
        <NavBar />
        <figure>
          <img src="src/assets/stake.png" alt="stake" />
        </figure>
        <h1>
          Rezept <br /> Sharing <br />
          Plattform
        </h1>
      </div>
      <i className="fas fa-arrow-down"></i>
    </header>
  );
};

export default Header;