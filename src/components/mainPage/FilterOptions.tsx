import { Dispatch, FC, SetStateAction } from "react";
import style from "../../styles/mainPage/main.module.scss";

interface filterType {
  changeCategory: Dispatch<SetStateAction<string[]>>;
}

const FilterOptions: FC<filterType> = ({ changeCategory }) => {
  const filterOptions = [
    "Vegan",
    "Asiatisch",
    "Pasta/Nudel",
    "Salat",
    "Burger",
    "Meeresfrüchte",
    "Sonstiges",
  ];

  const getChange = () => {
    const value = ["asia"];

    // changeCategory((lastState) => {
    //   return [...lastState, value];
    // });
    changeCategory([...value]);
  };

  return (
    <div className={style.filterOptions}>
      <label>Filter Options:</label>
      <ul className={style.filterList}>
        {filterOptions.map((filterOption, index) => (
          <li key={index}>{filterOption}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterOptions;
