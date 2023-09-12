import { FC,useState ,useEffect } from "react";
import styles from "../../styles/cardRecipe/_card.module.scss";
import Rewiews from "./Rewiews";
import {completeRecipe } from "../../models/recipe";
import { NavigateFunction, useNavigate } from "react-router-dom";
type cardType = { data: completeRecipe | undefined};

const Card: FC<cardType> = ({ data }) => {
 //const { image, title, like, time } = data;
 const [rating, setRating] = useState<number>(0)
 const navigate:NavigateFunction = useNavigate();
 const showRecipe = ():void => {
     navigate(`/recipe/${data?._id}`);
 }
 
 const calcRewiews = (): void => {
  if (data?.view !== 0) {
    let rating: number = !data?.rating ? 1 : data?.rating;
    let view: number = !data?.view ? 1 : data?.view;
    setRating(Math.trunc(rating / view));
  } else {
    setRating(0);
  }
};

useEffect(() => {
  calcRewiews();
},[data])
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
            {/* {[...Array<undefined>(5)].map((item,index:number) => {
              return <Rewiews key={`${index}-${item}`}/>;
            })} */}
            <Rewiews setRating={setRating} size={18} initialValue={rating} readonly={true} showTooltip={false} width=''/>
            <p>{data?.view} Rewiews </p> {/*(8 Rewiews)*/}
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
