import React, { useState } from "react";
import style from "../../styles/mainPage/main.module.scss";
import { completeRecipe } from "../../models/recipe";

import Card from "../cardRecipe/Card";

interface RandomBtnProps {
  recipes: completeRecipe[];
}

const RandomBtn: React.FC<RandomBtnProps> = ({ recipes }) => {
  const [randomRecipe, setRandomRecipe] = useState<completeRecipe | null>(null);

  const handleRandomClick = () => {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const randomRecipe = recipes[randomIndex];
    setRandomRecipe(randomRecipe);
  };

  const handleCloseClick = () => {
    setRandomRecipe(null);
  };

  return (
    <div>
      <button className={style.randomBtn} onClick={handleRandomClick}>
        <i className="fas fa-random"></i> Zufälliges Rezept{" "}
        <i className="fas fa-random"></i>
      </button>

      {randomRecipe && (
        <div className={style.randomRecipeOverlay}>
          <div className={style.randomRecipeCard}>
            <div className={style.card}>
              <Card data={randomRecipe} />
            </div>
            <button className={style.closeButton} onClick={handleCloseClick}>
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomBtn;
