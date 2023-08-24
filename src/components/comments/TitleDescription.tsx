import { FC , useEffect,useState} from "react";
import styles from "../../styles/comments/titleDescription.module.scss";
import { CountRewiews } from "./CountRewiews";
import Comment from "./Comment";
import Card from "../cardRecipe/Card";
import { recipeType } from "../../models/recipe";
//import instance from "../../api/instance";
import axios from "axios";

const TitleDescription: FC = () => {
  // const getData = () => {
  //   instance.get("/recipe/64d394cb3b9a0f12a8cee52a").then((res) => {
  //     console.log(res);
      
  //   });
  // }
  //getData();
  const [dataRecipe,setDataRecipe] = useState<recipeType>();
  async function getTutorial() {
    try {
      const response = await axios.get('http://localhost:3000/recipe/64e5e9f9aad54a0f87ae7650');
        setDataRecipe(response.data) 
        console.log(dataRecipe?.material);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getTutorial();
  },[])
  
   
  const arrZutaten = [
    { title: "Avocado", number: 2, unit: "kg" },
    { title: "Salz und Pfeffe", number: "", unit: "" },
    { title: "Tomaten", number: 4, unit: "kg" },
    { title: "Salz und Pfeffe", number: "", unit: "" },
    { title: "Tomaten", number: 4, unit: "kg" },
  ];

  const imgArr = ["/src/assets/frite-salad.png"];

  return (
    <>
      <div className={styles.wrapper}>
        <section className={styles.sectImg}>
          <h2>Title</h2>
          <img
            className={styles.imgRecipe}
            src={"/src/assets/1a-guacamole-dip.jpg"} //removebg-incognito.png incognita.jpg
            alt="image incognita"
          />
          <CountRewiews />
        </section>
        <section className={styles.sectZutaten}>
          <div>
            <h3>Zutaten</h3>
            {dataRecipe?.material?.map((zutaten, index) => {
              return (
                <div
                  className={styles.listItem}
                  style={
                    index % 2 === 0
                      ? { backgroundColor: "#dbe0ce" }
                      : { backgroundColor: "" }
                  }
                >
                  <p>
                    {/* {zutaten.number === "" ? 0 : zutaten.number} */}
                    {zutaten.number}
                  </p>
                  <p style={{ textAlign: "left" }}>{zutaten.title}</p>
                  <p>{zutaten.unit}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <section className={styles.zubereitung}>
        <h3>Zubereitung</h3>
        <p>
          Die Avocados halbieren, den Kern entfernen. Mit einem Löffel das
          Fruchtfleisch herauslösen und mit einer Gabel zu feinem Mus
          zerdrücken. Die Tomatenwürfel, den Zitronensaft, den Knoblauch und den
          Joghurt dazugeben und alles miteinander verrühren. Mit Salz und
          Pfeffer abschmecken. Schmeckt gut zu Kartoffelecken, auf Tortillas und
          zu allem was man dippen kann. Hinweis der Chefkoch-Rezeptbearbeitung:
          Die Mengenangabe "1 Portion" bezieht sich darauf, dass hier 1 Dip
          hergestellt wird. Der reicht auf jeden Fall für mehr als 1 Person. Wer
          weniger machen möchte, verwendet nur 1 Avocado und die Hälfte der
          übrigen Zutaten.
        </p>
      </section>

      <section className={styles.sectComment}>
        <h3>Kommentare</h3>
        <Comment />
        <Comment />
        <div className={styles.btn}>Alle Kommentare anzeigen</div>
      </section>

      <div className={styles.similarRecipes}>
        <h3>Änliche Rezepte</h3>
        <div className={styles.cardContainer}>
          <Card img={imgArr} rewiews={8} title="Chilli con Carne" time={23} />
          <Card img={imgArr} rewiews={8} title="Chilli con Carne" time={23} />
          <Card img={imgArr} rewiews={8} title="Chilli con Carne" time={23} />
          <Card img={imgArr} rewiews={8} title="Chilli con Carne" time={23} />
        </div>
      </div>
    </>
  );
};

export default TitleDescription;
