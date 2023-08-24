import React from "react";
import style from "../../styles/mainPage/main.module.scss";
import { Recipe } from "./Search";

interface RandomBtnProps {
  recipes: Recipe[];
  onSelectRandomRecipe: (recipe: Recipe) => void;
}

const RandomBtn: React.FC<RandomBtnProps> = ({
  recipes,
  onSelectRandomRecipe,
}) => {
  const handleRandomClick = () => {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const randomRecipe = recipes[randomIndex];
    onSelectRandomRecipe(randomRecipe);
  };

  return (
    <button className={style.randomBtn} onClick={handleRandomClick}>
      <i className="fas fa-random"></i> Random Recipe{" "}
      <i className="fas fa-random"></i>
    </button>
  );
};

export default RandomBtn;
