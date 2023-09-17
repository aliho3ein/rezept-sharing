import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import style from "../../styles/mainPage/main.module.scss";
import { CategoryType } from "../../models/recipe";

interface filterType {
  changeCategory: Dispatch<SetStateAction<string[]>>;
}

const FilterOptions: FC<filterType> = ({ changeCategory }) => {
  const filterOptions: CategoryType[] = [
    "Asiatisch",
    "Italienisch",
    "Orientalisch",
    "Burger",
    "Meeresfrüchte",
    "Griechisch",
    "Spanisch",
    "Vegan",
    "Sushi",
    "BBQ/Grill",
    "Snacks",
    "Sonstiges",
  ];
  const [category, setCategory] = useState<string[]>([]);

  const handleCheckboxChange = (selectedValue: string) => {
    if (category.includes(selectedValue)) {
      setCategory((prevCategories) =>
        prevCategories.filter((category) => category !== selectedValue) //esto quita la category del category array si ya se encuentra ahi  
      );
    } else {
      setCategory((prevCategories) => [...prevCategories, selectedValue]);
    }
  };
  useEffect(() => {
    changeCategory(category);
  }, [category, changeCategory]);

  
  return (
    <div className={style.filterOptionsContainer}>
      <label className={style.labelFilterTitle}>
        Filter Options: {category.join(", ")}
      </label>
      <ul className={style.filterList}>
        {filterOptions.map((option, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={option}
              value={option}
              className={style.filterInput}
              checked={category.includes(option)} // estoa hace que cambie de color los botonnes
              onChange={() => handleCheckboxChange(option)} // aqui se guarda en array category las categorias que vas clickkeando 
            />
            <label htmlFor={option} className={style.filterLabel}>
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterOptions;

/* import { Dispatch, FC, SetStateAction, useState } from "react";
import style from "../../styles/mainPage/main.module.scss";
import { CategoryType } from "../../models/recipe";

interface FilterType {
  changeCategory: Dispatch<SetStateAction<CategoryType[]>>;
}

const FilterOptions: FC<FilterType> = ({ changeCategory }) => {
  const filterOptions: CategoryType[] = [
    "Asiatisch",
    "Italienisch",
    "Orientalisch",
    "Burger",
    "Meeresfrüchte",
    "Griechisch",
    "Spanisch",
    "Vegan",
    "Sushi",
    "BBQ/Grill",
    "Snacks",
    "Sonstiges",
  ];
  const [category, setCategory] = useState<CategoryType[]>([]);

  const handleCheckboxChange = (selectedValue: CategoryType) => {
    if (category.includes(selectedValue)) {
      const updatedCategories = category.filter(
        (item) => item !== selectedValue
      );
      setCategory(updatedCategories);
    } else {
      const updatedCategoriesSelected = [...category, selectedValue];
      setCategory(updatedCategoriesSelected);
    }
    changeCategory(category);
  };

  return (
    <div className={style.filterOptionsContainer}>
      <label className={style.labelFilterTitle}>
        Filter Options: {category.join(", ")}
      </label>
      <ul className={style.filterList}>
        {filterOptions.map((option, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={option}
              value={option}
              className={style.filterInput}
              checked={category.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />
            <label htmlFor={option} className={style.filterLabel}>
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterOptions; */
