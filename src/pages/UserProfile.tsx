import { FC } from "react";
// import { Link } from "react-router-dom";
// import style from "../styles/userProfile/userProfile.module.scss";
import AddRecipeForm from "../components/userProfile/AddRecipeForm";

const UserProfile: FC = () => {
  return (
    <>
      {/* <button>
        <Link to="/">
          <i className={`fa-solid fa-reply ${style.returnArrow}`}></i>
          Zurück
        </Link>
      </button>
      <span>Rezept hinzufügen</span>
      <button>
        <i className={`fa-solid fa-plus ${style.addRecipe}`}></i>
      </button> */}
      <AddRecipeForm />
    </>
  );
};

export default UserProfile;
