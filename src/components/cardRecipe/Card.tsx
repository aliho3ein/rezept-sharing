import { FC } from "react";
import styles from "../../styles/cardRecipe/_card.module.scss";
import Rewiews from "./Rewiews";
import { cardRecipe } from "../../models/recipe";

type cardType = { data: cardRecipe };

const Card: FC<cardType> = ({ data }) => {
  const { image, title, like, time } = data;

  return (
    <section className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.imageCard}>
          <img src={image[0]} /> {/*"src/assets/frite-salad.png" alt="image" */}
        </div>
        <div className={styles.cardInfo}>
          <p className={styles.titleRecipe}>{title}</p>{" "}
          {/*Special Salad Chicken*/}
          <div className={styles.rewiews}>
            {[...Array<undefined>(5)].map(() => {
              return <Rewiews />;
            })}
            <p>{like[0]}Rewiews </p> {/*(8 Rewiews)*/}
          </div>
          <div className={styles.line}></div>
          <div className={styles.timeWiew}>
            <p className={styles.time}> {time}mins</p> {/*  20 mins*/}
            <div className={styles.viewRecipe}>View Recipe</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
