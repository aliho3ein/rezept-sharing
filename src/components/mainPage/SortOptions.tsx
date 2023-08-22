import { FC } from "react";
import style from "../../styles/mainPage/main.module.scss";

const SortOptions: FC = () => {
  const sortOptions = ["Neueste", "Beliebsteste", "Meist Gesehene"];

  return (
    <div className={style.sortOptions}>
      <label>Sort Options:</label>
      <ul className={style.sortList}>
        {sortOptions.map((sortOption, index) => (
          <li key={index}>{sortOption}</li>
        ))}
      </ul>
    </div>
  );
};

export default SortOptions;
