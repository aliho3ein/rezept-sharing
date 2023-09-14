import { FC, useEffect, useState, useContext } from "react";
import styles from "../../styles/comments/titleDescription.module.scss";
import Comment from "./Comment";
import Card from "../cardRecipe/Card";
import { completeRecipe } from "../../models/recipe";
import { comment } from "../../models/comment";
import TextareaComment from "./TextareaComment";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Rewiews from "../cardRecipe/Rewiews";
import instance from "../../api/instance";
import { alertMassage } from "../../actions/alerts";
import DropDownUserProfile from "../dropDownUserProfile/DropDownUserProfile";

const TitleDescription: FC = () => {

  const [rewiews, setRewiews] = useState(0);
  const [showRewiews, setShowRewiews] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [dataRecipe, setDataRecipe] = useState<completeRecipe>();
  const [dataComment, setDataComment] = useState<[comment]>();
  const [auxComment, setAuxComment] = useState<[comment]>();
  const [dataCategory, setDataCategory] = useState<[completeRecipe]>();
  const [texto, setTexto] = useState<string>("Alle Kommentare anzeigen");
  const [flag, setFlag] = useState<boolean>(false);
  const { id } = useParams<string>();

  const setBewerten =async () => {
    const bool= await isAlreadyRaiting();
    if (bool)
      return alertMassage("Sie haben dieses Rezept bereits bewertet", "error");
    instance
      .put(`/recipe/rewiews/${id}`, {
        rating: (dataRecipe?.rating as number) + rating,
        rewiews: (dataRecipe?.view as number) + 1,
        userId: dataRecipe?.userID,
      })
      .then((response) => {
        console.log(response);
        getRecipe();
        setRating(0);
        setShowRewiews(!showRewiews);
        alertMassage("Vielen Dank für Ihre Bewertung");
      })
      .catch((err) => console.log(err));
  };

  async function getRecipe() {
    try {
      const response = await instance.get(`/recipe/${id}`);
      setDataRecipe(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getComments() {
    try {
      const response = await instance.get(`/comment/${id}`);
      setDataComment(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getByCategory() {
    try {
      const response = await instance.get(
        `/recipe/category/${dataRecipe?.category[1]}` //**category[0] or [1]?? question
      );
      setDataCategory(response.data);
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
    calcRewiews();
  }, [dataRecipe]);

  ///*************************
  console.log(dataRecipe?.userID);

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

  const verifyRewiews = async () => {
    if (!user) {
      alertMassage("Melde dich an und bewerte das Rezept.", "info");
    } else {
      const boolRaiting = await isAlreadyRaiting();
      if (!boolRaiting) {
        setRating(0);
        setShowRewiews(!showRewiews);
      } else {
        return alertMassage(
          "Sie haben dieses Rezept bereits bewertet",
          "error"
        );
      }
    }
  };

  const abbrechenButton = (): void => {
    setRating(0);
    setShowRewiews(!showRewiews);
  };

  const isAlreadyRaiting = async () => {
    const data = await instance
      .get(`/recipe/user/${dataRecipe?.userID}/userating/${dataRecipe?._id}`)
      .then((response) => {
        return response.data.isUser;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    console.log(data);
    return data;
  };

  const calcRewiews = (): void => {
    if (dataRecipe?.view !== 0) {
      let rating: number = !dataRecipe?.rating ? 1 : dataRecipe?.rating;
      let view: number = !dataRecipe?.view ? 1 : dataRecipe?.view;
      setRewiews(Math.trunc(rating / view));
    } else {
      setRewiews(0);
    }
  };

  const { user } = useContext(AuthContext);

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
          <div onClick={verifyRewiews} className={styles.mainRewiews}>
            <Rewiews
              setRating={setRating}
              size={25}
              initialValue={rewiews}
              readonly={true}
              showTooltip={false}
              width=""
            />
            <p>({dataRecipe?.view} Rewiews)</p>
          </div>

          {showRewiews && (
            <div className={styles.bewertungen}>
              <Rewiews
                setRating={setRating}
                size={50}
                initialValue={rating}
                readonly={false}
                showTooltip={true}
                width={"450px"}
              />
              <div className={styles.input}>
                <input
                  onClick={abbrechenButton}
                  className={styles.abbrechen}
                  type="button"
                  value="Abrechen"
                />
                <input
                 disabled= { rating === 0 ?true : false} onClick={setBewerten}
                  className={
                    rating === 0 ? styles.bewertenOff : styles.bewerten
                  }
                  type="button"
                  value="Bewerten"
                />
              </div>
            </div>
          )}
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
      <>
      <DropDownUserProfile/>
      </>
    </>
  );
};

export default TitleDescription;
//<Card  img ={imgArr} rewiews={8} title="Chilli con Carne" time={23} />
