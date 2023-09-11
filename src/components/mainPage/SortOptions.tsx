import { FC } from "react";
import style from "../../styles/mainPage/main.module.scss";

interface sortType {
  changeSort: (sortAction: string) => void;
}

const SortOptions: FC<sortType> = ({ changeSort }) => {
  const sortOptions = [
    { label: "Neueste", action: "createAt" },
    { label: "Zeit", action: "time" },
    { label: "Meist Gesehene", action: "view" },
  ];
  const handleSortChange = (sortAction: string) => {
    changeSort(sortAction);
  };

  return (
    <div className={style.sortOptionsContainer}>
      <label className={style.labelSortTile}>Sort Options:</label>
      <ul className={style.sortList}>
        {sortOptions.map((sortOption, index) => (
          <li key={index}>
            <input
              type="radio"
              id={sortOption.action}
              name="sortOption"
              value={sortOption.action}
              onChange={() => handleSortChange(sortOption.action)}
              className={style.sortInput}
            />
            <label htmlFor={sortOption.action} className={style.sortLabel}>
              {sortOption.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortOptions;
