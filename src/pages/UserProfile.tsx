import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "../styles/userProfile/userProfile.module.scss";
import AddRecipeForm from "../components/userProfile/AddRecipeForm";
import instance from "../api/instance";

const UserProfile: FC = () => {
  const { id } = useParams();
  const [popup, setPopup] = useState<boolean>(false);
  const [recipes, setRecipes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

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
      <button>
        <Link to="/">
          <i className={`fa-solid fa-reply ${style.returnArrow}`}></i>
          Zurück zum Feed
        </Link>
      </button>
      {/* <p>{userInfo.desc}</p> */}
      {/* <img src={userInfo.img} /> */}
      <main>{/* {recipes.map((recipe) => recipe)} */}</main>
      <span>Rezept hinzufügen</span>
      <button onClick={() => setPopup(true)}>
        <i className={`fa-solid fa-plus ${style.addRecipe}`}></i>
      </button>
      {popup && <AddRecipeForm closePopup={setPopup} />}
    </section>
  );
};

export default UserProfile;
