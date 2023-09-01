import { FC, useEffect, useState } from "react";
import styles from "../../styles/comments/titleDescription.module.scss";
import { CountRewiews } from "./CountRewiews";
import Comment from "./Comment";
import Card from "../cardRecipe/Card";
import { completeRecipe } from "../../models/recipe";
import { comment } from "../../models/comment";
//import instance from "../../api/instance";
import axios from "axios";
import TextareaComment from "./TextareaComment";

const TitleDescription: FC = () => {
  // const getData = () => {
  //   instance.get("/recipe/64d394cb3b9a0f12a8cee52a").then((res) => {
  //     console.log(res);

  //   });
  // }
  //getData();
  const [dataRecipe, setDataRecipe] = useState<completeRecipe>();
  const [dataComment, setDataComment] = useState<[comment]>();
  const [auxComment, setAuxComment] = useState<[comment]>();
  const [texto, setTexto] = useState<string>("Alle Kommentare anzeigen");
  const [flag, setFlag] = useState<boolean>(false);
  
  async function getRecipe() {
    try {
      const response = await axios.get(
        "http://localhost:3000/recipe/64eef4d8f36d0997fe144773"
      );
      setDataRecipe(response.data);
      console.log(dataRecipe?._id)
    } catch (error) {
      console.error(error);
    }
  }
  async function getComments() {
    try {
      const response = await axios.get(
        "http://localhost:3000/comment/64eef4d8f36d0997fe144773"
      );
         setDataComment(response.data);
      
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getRecipe();
    getComments();
  }, [flag]);

  useEffect(() => {
    Comments();
  }, [dataComment]);


///*************************
  console.log(flag);
  //console.log(dataComment);
///******************************


  const Comments = (): void => {
    let aux: any = dataComment;
    if (dataComment && dataComment.length > 1) {
      aux = dataComment.slice(0, 1);
    }
      setAuxComment(aux);
  };

  const showAllComment = (): void => {
      
   
    if (texto === "Alle Kommentare anzeigen") {
      setTexto("Weniger Kommentare anzeigen");
      setAuxComment(dataComment);
    } else if (texto === "Weniger Kommentare anzeigen") {
      setTexto("Alle Kommentare anzeigen");
      const aux:any = dataComment?.slice(0,1);
      setAuxComment(aux);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <section className={styles.sectImg}>
          <h2>{dataRecipe?.title}</h2>
          <img
            className={styles.imgRecipe}
            src={dataRecipe?.image? dataRecipe.image[0]:"/src/assets/icons-camera.png"} // verification if  image exists {"/src/assets/1a-guacamole-dip.jpg"}
            alt="image incognita"
          />
          <CountRewiews />
        </section>
        <section className={styles.sectZutaten}>
          <div>
            <h3>Zutaten</h3>
            {dataRecipe?.material?.map(({ name, count, unit }: any, index) => {
              return (
                <div
                  key={index}
                  className={styles.listItem}
                  style={
                    index % 2 === 0
                      ? { backgroundColor: "#dbe0ce" }
                      : { backgroundColor: "" }
                  }
                >
                  <p className={styles.paraphName}>{name}</p>

                  <p>
                    {count} {unit}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <section className={styles.zubereitung}>
        <h3>Zubereitung</h3>
        <p>{dataRecipe?.desc}</p>
      </section>

      <section className={styles.sectComment}>
        <h3>Kommentare</h3>
        <TextareaComment recipeID = {dataRecipe?._id} flag= {flag} setFlag={setFlag} setText={setTexto} />
        
        {auxComment ? (
          auxComment.map((comment, index) => (
            <Comment key={index} data={comment} />
          ))
        ) : (
          <p>Noch keine Kommentare vorhanden ...</p>
        )}

        <div onClick={showAllComment} className={styles.btn}>
          {texto}
        </div>
      </section>

      <div className={styles.similarRecipes}>
        <h3>Änliche Rezepte</h3>
        <div className={styles.cardContainer}>
          <Card data={dataRecipe} />
          <Card data={dataRecipe} />
          <Card data={dataRecipe} />
          <Card data={dataRecipe} />
        </div>
      </div>
    </>
  );
};

export default TitleDescription;
//<Card  img ={imgArr} rewiews={8} title="Chilli con Carne" time={23} />
