import { FC } from "react";
import style from "./../styles/header.module.scss";
//import instance from "./../api/instance";
//import { completeRecipe, recipeType } from "../models/recipe";

const Header: FC = () => {
  // const getData = () => {
  //   instance.get("/user").then((res) => {
  //     console.log(res);
  //   });

  //   const recipeData: recipeType = {
  //     userID: "",
  //     title: "",
  //     material: [],
  //     desc: "",
  //     image: [""],
  //     category: ["asian"],
  //     time: 5,
  //   };

  //   instance.post("/recipe", recipeData);

  //   instance
  //     .get("/recipe")
  //     .then((res) => {
  //       const recipes: completeRecipe[] = res.data;
  //     })
  //     .catch((err) => console.log("error while getting recipes from db"));
  // };

  return <div className={style.mainHeader}>Header</div>;
};

export default Header;
