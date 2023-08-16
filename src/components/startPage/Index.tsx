import { FC } from "react";
import Header from "./Header";
import About from "./About";

//import Card from "../cardRecipe/Card";

import Crew from "./Crew";

import style from "../../styles/startPage/index.module.scss";
import Contact from "../contactPage/Contact";

const StartPage: FC = () => {
  return (
    <>
      <Header />

      <About />

      <main className={style.mainContainer}>
        <About />
        <section className={style.imageBlock}>
          <div data-aos="zoom-in-down">
            Entdecken, Kreieren, Teilen: Deine kulinarische Reise beginnt hier
          </div>
        </section>
        <Crew />
      </main>
      <Contact />
      <footer className={style.footerContainer}>
        Copyright 2023 &copy; Powered By Tasty-Pixel
      </footer>
    </>
  );
};

export default StartPage;
