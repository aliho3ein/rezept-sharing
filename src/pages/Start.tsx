import { FC, useEffect, useState } from "react";
import style from "../styles/mainPage/main.module.scss";
import recipes from "../components/mainPage/RecipeData";
import Search from "../components/mainPage/Search";
import FilterOptions from "../components/mainPage/FilterOptions";
import SortOptions from "../components/mainPage/SortOptions";
import instance from "../api/instance";
import Card from "../components/cardRecipe/Card";
import { recipeType } from "../models/recipe";
import { alertMassage } from "../actions/alerts";

const Start: FC = () => {
  const [recipeList, setRecipeList] = useState<recipeType[]>([]);
  const [sort, setSort] = useState<string>("view");
  const [category, setCategory] = useState<string[]>([]);
  const [pageNr, setPageNr] = useState<number>(1);

  useEffect(() => {
    instance
      .get<recipeType[]>(`recipe/page/${pageNr}`, {
        params: { sort, category },
      })
      .then((res) => setRecipeList(res.data))
      .catch((err) => console.log(err));
  }, [sort, pageNr, category]);

  // const { isError, isLoading, data } = useQuery("fetchRecipes", async () => {
  //   return instance
  //     .get<recipeType[]>("recipe/page/1", { params: { sort } })
  //     .then((res) => res.data)
  //     .catch((err) => console.log(err));
  // });

  // if (isError) {
  //   alertMassage("fehler beim fetch data", "error");
  // }

  // if (isLoading) {
  //   return <h2>Loading</h2>;
  // }

  return (
    <>
      <div className={style.start}>
        <Search recipes={recipes} />
        <FilterOptions changeCategory={setCategory} />
        <SortOptions changeSort={setSort} />
      </div>

      {recipeList.map((item, index) => {
        return <Card data={item} key={index} />;
      })}
    </>
  );
};

export default Start;
