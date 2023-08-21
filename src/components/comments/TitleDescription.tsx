import { FC } from "react";
import styles from "../../styles/comments/titleDescription.module.scss";
import { CountRewiews } from "./CountRewiews";
const TitleDescription: FC = () => {
  const arrZutaten = [
    { title: "Avocado", number: 2, unit: "kg" },
    { title: "Salz und Pfeffe", number: "", unit: "" },
    { title: "Tomaten", number: 4, unit: "kg" },
    { title: "Salz und Pfeffe fdfgfgf", number: "", unit: "" },
    { title: "Tomaten", number: 4, unit: "kg" },
  ];

  return (
    <>
      <div className={styles.wrapper}>
        <section className={styles.sectImg}>
          <h2>Title</h2>
          <img
            className={styles.imgRecipe}
            src={"/src/assets/removebg-incognito.png"} //removebg-incognito.png incognita.jpg
            alt="image incognita"
          />
          <CountRewiews />
        </section>
        <section className={styles.sectZutaten}>
          <div>
            <h3>Zutaten</h3>
            {arrZutaten.map((zutaten, index) => {
              return (
                <div
                  className={styles.listItem}
                  style={
                    index % 2 === 0
                      ? { backgroundColor: "#dbe0ce" }
                      : { backgroundColor: "" }
                  }
                >
                  <p
                    // style={
                    //   zutaten.number === ""
                    //     ? { visibility: "hidden" }
                    //     : { visibility: "visible" }
                    // }
                  >
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
      </>
  );
};

export default TitleDescription;
