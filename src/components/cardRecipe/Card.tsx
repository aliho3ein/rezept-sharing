import { FC } from "react";
import styles from "../../styles/cardRecipe/_card.module.scss";
import Rewiews from "./Rewiews";
import {completeRecipe } from "../../models/recipe";

type cardType = { data: completeRecipe | undefined};

const Card: FC<cardType> = ({ data }) => {
 //const { image, title, like, time } = data;

  return (
    <section className={styles.cardContainer}>
      <div className={styles.card}>
        <figure>
          <img className={styles.img} src={data?.image[0]} /> {/*"src/assets/frite-salad.png" alt="image" */}
        </figure>
        <div className={styles.cardInfo}>
          <p className={styles.titleRecipe}>{data?.title}</p>{" "}
          {/*Special Salad Chicken*/}
          <div className={styles.rewiews}>
            {[...Array<undefined>(5)].map(() => {
              return <Rewiews />;
            })}
            <p>{data?.like[0]}Rewiews </p> {/*(8 Rewiews)*/}
          </div>
          <hr />
          <div className={styles.timeWiew}>
            <p> {data?.time}mins</p> {/*  20 mins*/}
            <div>View Recipe</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
