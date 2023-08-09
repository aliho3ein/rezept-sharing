import { FC } from "react";
import styles from "../../styles/cardRecipe/_card.module.scss";
import Rewiews from "./Rewiews";

const Card: FC = () => {
  return (
    <section className={styles.cardContainer}>
      <div className={styles.card}>
        <div>
          <img src="src/assets/frite-salad.png" alt="image" />
        </div>
        <div className={styles.cardInfo}>
          <p className={styles.titleRecipe}>Special Salad Chicken</p>
          <div className={styles.rewiews}>
          {[...Array(5)].map(() => {
            return <Rewiews />  
           })}
           <p>(7 Rewiews)</p>  
          </div> 
          <hr />
          <div className={styles.timeWiew}>
            <p>20 mins</p>
            <div>View Recipe</div>
          </div>
        </div>
      </div>
   </section>
  );
};

export default Card;
