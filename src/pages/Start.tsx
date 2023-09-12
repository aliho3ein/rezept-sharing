import { FC, useEffect, useState } from "react";
import style from "../styles/mainPage/main.module.scss";
import Search from "../components/mainPage/Search";
import FilterOptions from "../components/mainPage/FilterOptions";
import SortOptions from "../components/mainPage/SortOptions";
import instance from "../api/instance";
import Card from "../components/cardRecipe/Card";
import { completeRecipe } from "../models/recipe";
import DropDownUserProfile from "../components/dropDownUserProfile/DropDownUserProfile";
import RandomBtn from "../components/mainPage/RandomBtn";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

const Start: FC = () => {
  const [recipeList, setRecipeList] = useState<completeRecipe[]>([]);
  const [sort, setSort] = useState<string>("view");
  const [category, setCategory] = useState<string[]>([]);
  const [pageNr, setPageNr] = useState<number>(1);

  const countPerPage = 4;
  const nextPage = () => {
    if (pageNr < 3) {
      setPageNr(pageNr + 1);
    }
  };

  const prevPage = () => {
    if (pageNr > 1) {
      setPageNr(pageNr - 1);
    }
  };

  useEffect(() => {
    instance
      .get<completeRecipe[]>(`/recipe/page/${pageNr}`, {
        params: { countPerPage, /*  sort */ category: category.join(",") },
      })
      .then((res) => {
        let sortedRecipes = res.data;
        console.log(recipeList);
        console.log("cat", category);
        console.log("sort", sort);
        if (sort === "view") {
          sortedRecipes = sortedRecipes.sort((a, b) => b.view - a.view);
        } else if (sort === "createAt") {
          sortedRecipes = sortedRecipes.sort(
            (a, b) =>
              new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
          );
        } else if (sort === "time") {
          sortedRecipes = sortedRecipes.sort((a, b) => a.time - b.time);
        }
        setRecipeList(sortedRecipes);
      })
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
    <div className={style.startPageContainer}>
      <DropDownUserProfile />

      <div className={style.recipeCard}>
        <div className={style.recipesComponent}>
          <Search recipes={recipeList} />
          <RandomBtn recipes={recipeList} />
          <FilterOptions changeCategory={setCategory} />
          <SortOptions changeSort={setSort} />
        </div>

        <div className={style.cardsContainer}>
          {recipeList.map((item, index) => {
            if (category.length === 0 || category.includes(item.category[1])) {
              return <Card data={item} key={index} />;
            }
            return null;
          })}
        </div>
      </div>
      <div className={style.pagination}>
        <BsFillArrowLeftSquareFill onClick={prevPage} className={style.icon} />

        <span className={style.pageNr}>{pageNr}</span>
        <BsFillArrowRightSquareFill className={style.icon} onClick={nextPage} />
      </div>
    </div>
  );
};

export default Start;
