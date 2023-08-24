import { FC } from "react";
import style from "../../styles/mainPage/main.module.scss";

interface sortType {
  // eslint-disable-next-line @typescript-eslint/ban-types
  changeSort: Function;
}

const SortOptions: FC<sortType> = ({ changeSort }) => {
  const sortOptions = [
    { label: "Neueste", action: "createdAt" },
    { label: "Zeit", action: "time" },
    { label: "Meist Gesehene", action: "view" },
  ];

  return (
    <div className={style.sortOptions}>
      <label>Sort Options:</label>
      <ul className={style.sortList}>
        {sortOptions.map((sortOption, index) => (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          <li key={index} onClick={() => changeSort(sortOption.action)}>
            {sortOption.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortOptions;
