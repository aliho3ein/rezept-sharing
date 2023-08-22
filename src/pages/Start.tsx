import { FC } from "react";
import style from "../styles/mainPage/main.module.scss";
import recipes from "../components/mainPage/RecipeData";
import Search from "../components/mainPage/Search";
import FilterOptions from "../components/mainPage/FilterOptions";
import SortOptions from "../components/mainPage/SortOptions";

const Start: FC = () => {
  return (
    <div className={style.start}>
      <Search recipes={recipes} />
      <FilterOptions />
      <SortOptions />
    </div>
  );
};

export default Start;
