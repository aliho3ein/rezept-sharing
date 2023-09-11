import { FC, useEffect, useState, useContext } from "react";
import styles from "../../styles/comments/titleDescription.module.scss";
import Comment from "./Comment";
import Card from "../cardRecipe/Card";
import { completeRecipe } from "../../models/recipe";
import { comment } from "../../models/comment";
import axios from "axios";
import TextareaComment from "./TextareaComment";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Rewiews from "../cardRecipe/Rewiews";
//import instance from "../../api/instance";

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
  const [dataCategory, setDataCategory] = useState<[completeRecipe]>();
  const [texto, setTexto] = useState<string>("Alle Kommentare anzeigen");
  const [flag, setFlag] = useState<boolean>(false);
  const { id } = useParams<string>();

  async function getRecipe() {
    try {
      const response = await axios.get(`http://localhost:3000/recipe/${id}`);
      setDataRecipe(response.data);
      console.log(dataRecipe?._id);
    } catch (error) {
      console.error(error);
    }
  }
  async function getComments() {
    try {
      const response = await axios.get(`http://localhost:3000/comment/${id}`);
      setDataComment(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getByCategory() {
    try {
      const response = await axios.get(
        `http://localhost:3000/recipe/category/${dataRecipe?.category[1]}` //**category[0] or [1]?? question
      );
      setDataCategory(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getRecipe();
    getComments();
  }, [flag, id]);

  useEffect(() => {
    Comments();
  }, [dataComment]);

  useEffect(() => {
    getByCategory();
  }, [dataRecipe]);

  ///*************************
  console.log(dataRecipe?.category[1]);
  //console.log(dataComment);
  //getByCategory();
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
      const aux: any = dataComment?.slice(0, 1);
      setAuxComment(aux);
    }
  };

  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <>
      <div className={styles.wrapper}>
        <section className={styles.sectImg}>
          <h2>{dataRecipe?.title}</h2>
          <img
            className={styles.imgRecipe}
            src={
              dataRecipe?.image
                ? dataRecipe.image[0]
                : "/src/assets/icons-camera.png"
            } // verification if  image exists {"/src/assets/1a-guacamole-dip.jpg"}
            alt="image incognita"
          />
          {/* <CountRewiews /> */}
          <div className={styles.mainRewiews}>
            <Rewiews size={25} initialValue={0} readonly={true} showTooltip={false} width=''/>
            <p>(8 Rewiews)Rewiews </p>
           
          </div>
          {false && <div className={styles.bewertungen}>
              <Rewiews size={50} initialValue={0} readonly={false} showTooltip={true} width={'450px'} />
              <div className={styles.input}>
              <input className={styles.abbrechen} type="button" value="Abrechen" />
              <input className={styles.bewertenOff} type="button" value="Bewerten" />
              </div>
             
            </div>}
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
        {user && (
          <TextareaComment
            recipeID={dataRecipe?._id}
            flag={flag}
            setFlag={setFlag}
            setText={setTexto}
          />
        )}

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
          {dataCategory?.map((category, index: number) => {
            return <Card key={index} data={category} />;
          })}
        </div>
      </div>
    </>
  );
};

export default TitleDescription;
//<Card  img ={imgArr} rewiews={8} title="Chilli con Carne" time={23} />
