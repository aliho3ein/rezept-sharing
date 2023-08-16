import { FC } from "react";
import Header from "./Header";
import About from "./About";

//import Card from "../cardRecipe/Card";
import Crew from "./Crew";
import style from "../../styles/startPage/index.module.scss";
import instance from "../../api/instance";

const StartPage: FC = () => {
  console.log("ok");

  const getData = () => {
    instance
      .post("/user/registrieren", {
        username: "string",
        email: "aliho3ein.de@gamil.com",
        password: "string123",
        confirmPassword: "string123",
      })
      .then((res) => console.log(res))
      .catch(() => {
        console.log();
      });
  };

  getData();

  return (
    <>
      <Header />
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
