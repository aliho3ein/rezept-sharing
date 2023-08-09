import { FC } from "react";
import Header from "./Header";
import About from "./About";

//import Card from "../cardRecipe/Card";

import Crew from "./Crew";

import style from "../../styles/startPage/index.module.scss";


const StartPage: FC = () => {
  return (
    <>
      <Header />

      <About />
      {/* <Card/> */}


      <main className={style.mainContainer}>
        <About />
        <section className={style.imageBlock}>
          <div data-aos="zoom-in-down">
            Entdecken, Kreieren, Teilen: Deine kulinarische Reise beginnt hier
          </div>
        </section>
        <Crew />
      </main>
      <footer className={style.footerContainer}>
        Copyright 2023 &copy; Powered By Tasty-Pixel
      </footer>

    </>
  );
};

export default StartPage;
