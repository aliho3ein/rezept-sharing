import React, { useState } from "react";
import style from "../../styles/mainPage/main.module.scss";
import { completeRecipe } from "../../models/recipe";
import Card from "../cardRecipe/Card";

interface SearchProps {
  recipes: completeRecipe[];
}

const Search: React.FC<SearchProps> = ({ recipes }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRecipe, setSelectedRecipe] = useState<completeRecipe | null>(
    null
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedRecipe(null);
  };

  const handleCloseClick = () => {
    setSelectedRecipe(null);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedRecipe(null);
  };
  const handleRecipeClick = (recipe: completeRecipe) => {
    setSelectedRecipe(recipe);
  };
  return (
    <div className={style.recipeListContainer}>
      <div className={style.searchBox}>
        <i
          className={`fas fa-search ${style.searchIcon} ${
            searchQuery ? style.active : ""
          }`}
        ></i>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className={style.searchInput}
        />
        {searchQuery && (
          <i
            className={`fas fa-times ${style.clearIcon}`}
            onClick={clearSearch}
          ></i>
        )}
      </div>
      {searchQuery && (
        <ul className={style.recipes}>
          {recipes.map((recipe) => (
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
        <div className={style.searchRecipeOverlay}>
          y
          <div className={style.SearchRecipeCard}>
            <div className={style.card}>
              <Card data={selectedRecipe} />
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

export default Search;
