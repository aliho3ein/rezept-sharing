import { useState } from "react";
//import style from "../../styles/recipeListe.module.scss";
import style from "../../styles/mainPage/main.module.scss";
import RandomBtn from "./RandomBtn";

export interface Ingredient {
  name: string;
  amount: string;
  unit?: string;
}

export interface Recipe {
  title: string;
  type: string;
  ingredients: Ingredient[];
  images: string[];
  cookingTime: string;
}

export interface RecipeListProps {
  recipes: Recipe[];
}

const Search: React.FC<RecipeListProps> = ({ recipes }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showAllTitles, setShowAllTitles] = useState(false);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentRecipes = filteredRecipes;

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleSearchIconClick = () => {
    setShowAllTitles(!showAllTitles);
    setSearchQuery("");
  };
  const handleRandomRecipeSelect = (randomRecipe: Recipe) => {
    setSelectedRecipe(randomRecipe);
  };
  return (
    <>
      <div className={style.recipeListContainer}>
        <div className={style.searchBox}>
          <i
            className={`fas fa-search ${style.searchIcon} ${
              showAllTitles ? style.active : ""
            }`}
            onClick={handleSearchIconClick}
          ></i>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={style.searchInput}
          />
          {searchQuery && (
            <i
              className={`fas fa-times ${style.clearIcon}`}
              onClick={() => setSearchQuery("")}
            ></i>
          )}
        </div>
        {searchQuery && (
          <ul className={style.recipes}>
            {currentRecipes.map((recipe) => (
              <li
                key={recipe.title}
                className={style.recipeItem}
                onClick={() => handleRecipeClick(recipe)}
              >
                <h3 className={style.titleInput}>{recipe.title}</h3>
              </li>
            ))}
          </ul>
        )}
        {selectedRecipe && (
          <div className={style.modal}>
            <div className={style.modalContent}>
              <div className={style.iconContainer}>
                <i className={`fas fa-utensils ${style.recipeIcon}`}></i>
                <h2>{selectedRecipe.title}</h2>
              </div>
              <div className={style.imagesContainer}>
                {selectedRecipe.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Step ${index + 1}`}
                    className={style.recipeImage}
                  />
                ))}
              </div>
              <p className={style.recipeType}>Type: {selectedRecipe.type}</p>
              <h3 className={style.recipeIngredientsTitle}>Ingredients:</h3>
              <ul className={style.recipeIngredients}>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className={style.recipeIngredientItem}>
                    <span className={style.recipeIngredientName}>
                      {ingredient.name}:
                    </span>{" "}
                    <div className={style.recipeIngredientDetails}></div>
                    <span className={style.recipeIngredientAmount}>
                      {ingredient.amount}
                    </span>{" "}
                    <span className={style.recipeIngredientUnit}>
                      {ingredient.unit}
                    </span>
                  </li>
                ))}
              </ul>
              <div className={style.iconContainerTime}>
                <i className={`fas fa-clock ${style.recipeIcon}`}></i>
                <p className={style.cookingTime}>
                  Cooking Time: {selectedRecipe.cookingTime}
                </p>
              </div>
              <button
                className={style.closeButton}
                onClick={() => setSelectedRecipe(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={style.centerBtn}>
        <RandomBtn
          recipes={filteredRecipes}
          onSelectRandomRecipe={handleRandomRecipeSelect}
        />
      </div>
    </>
  );
};

export default Search;
