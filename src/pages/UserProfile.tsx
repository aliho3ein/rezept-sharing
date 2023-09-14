import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "../styles/userProfile/userProfile.module.scss";
import AddRecipeForm from "../components/userProfile/AddRecipeForm";
import instance from "../api/instance";
import { userWithId } from "../models/user";
import Card from "../components/cardRecipe/Card";

const UserProfile: FC = () => {
  const { id } = useParams();
  const [popup, setPopup] = useState<boolean>(false);
  const [recipes, setRecipes] = useState([]);
  const [userInfo, setUserInfo] = useState<userWithId | null>(null);

  useEffect(() => {
    handleFetch(`/recipe/user/${id}`, setRecipes);
    handleFetch(`/user/${id}`, setUserInfo);
  }, [id]);

  function handleFetch(endpoint: string, setData: Function) {
    instance
      .get(endpoint)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }
  console.log(userInfo);
  console.log(recipes);

  return (
    <section className={style.userProfileContainer}>
      <Link to="/recipes">
        <i className={`fa-solid fa-reply ${style.returnArrow}`}></i>
        Zurück zum Start
      </Link>

      <img src={userInfo?.image?.[0]} />
      {userInfo?.info?.length ? (
        <p>{userInfo.info}</p>
      ) : (
        <p>Erzähl etwas über dich.</p>
      )}

      {recipes.length <= 0 ? (
        <p>Erstelle ein Rezept!</p>
      ) : (
        recipes.map((recipe, index) => <Card key={index} data={recipe} />)
      )}

      <span>Rezept hinzufügen</span>
      <button onClick={() => setPopup(true)}>
        <i className={`fa-solid fa-plus ${style.addRecipe}`}></i>
      </button>
      {popup && <AddRecipeForm closePopup={setPopup} />}
    </section>
  );
};

export default UserProfile;
