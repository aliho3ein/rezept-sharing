import { FC } from "react";
import style from "../../styles/mainPage/main.module.scss";

const FilterOptions: FC = () => {
  const filterOptions = [
    "Vegan",
    "Asiatisch",
    "Pasta/Nudel",
    "Salat",
    "Burger",
    "Meeresfrüchte",
    "Sonstiges",
  ];

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
