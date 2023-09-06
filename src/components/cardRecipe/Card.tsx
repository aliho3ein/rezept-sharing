import { FC } from "react";
import styles from "../../styles/cardRecipe/_card.module.scss";
import Rewiews from "./Rewiews";
import {completeRecipe } from "../../models/recipe";
import { NavigateFunction, useNavigate } from "react-router-dom";
type cardType = { data: completeRecipe | undefined};

const Card: FC<cardType> = ({ data }) => {
 //const { image, title, like, time } = data;
 const navigate:NavigateFunction = useNavigate();
 const showRecipe = ():void => {
     navigate(`/recipe/${data?._id}`);
 }
 
  return (
    <section className={styles.cardContainer}>
      <div className={styles.card}>
        <figure className={styles.imageCard}>
          <img className={styles.img} src={data?.image[0]} /> {/*"src/assets/frite-salad.png" alt="image" */}
        </figure>
        <div className={styles.cardInfo}>
          <p className={styles.titleRecipe}>{data?.title}</p>{" "}
          {/*Special Salad Chicken*/}
          <div className={styles.rewiews}>
            {[...Array<undefined>(5)].map((item,index:number) => {
              return <Rewiews key={`${index}-${item}`}/>;
            })}
            <p>{data?.like[0]}Rewiews </p> {/*(8 Rewiews)*/}
          </div>
          <hr />
          <div className={styles.timeWiew}>
            <p> {data?.time}mins</p> {/*  20 mins*/}
            <div onClick={showRecipe} className= {styles.viewRecipe}>View Recipe</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
