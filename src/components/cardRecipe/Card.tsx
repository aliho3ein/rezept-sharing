import { FC } from "react";
import styles from "../../styles/cardRecipe/_card.module.scss";
import Rewiews from "./Rewiews";
import { cardRecipe } from "../../models/recipe";

const Card: FC<cardRecipe> = ({ img, title, rewiews, time }) => {
  return (
    <section className={styles.cardContainer}>
      <div className={styles.card}>
        <div>
          <img src={img[0]} /> {/*"src/assets/frite-salad.png" alt="image" */}
        </div>
        <div className={styles.cardInfo}>
          <p className={styles.titleRecipe}>{title}</p>{" "}
          {/*Special Salad Chicken*/}
          <div className={styles.rewiews}>
            {[...Array<undefined>(5)].map(() => {
              return <Rewiews />;
            })}
            <p>{rewiews}Rewiews </p> {/*(8 Rewiews)*/}
          </div>
          <hr />
          <div className={styles.timeWiew}>
            <p> {time}mins</p> {/*  20 mins*/}
            <div>View Recipe</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
