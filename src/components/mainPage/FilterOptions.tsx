import { Dispatch, FC, SetStateAction, useState } from "react";
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
      const updatedCategories = category.filter(
        (item) => item !== selectedValue
      );
      setCategory(updatedCategories);

      changeCategory(updatedCategories);
    } else {
      const updatedCategories = [...category, selectedValue];
      setCategory(updatedCategories);
      changeCategory(updatedCategories);
    }
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
              onChange={(e) => handleCheckboxChange(e.target.value)}
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
