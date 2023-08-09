import { FC } from "react";
import { Link } from "react-router-dom";
import AddRecipeForm from "../components/userProfile/AddRecipeForm";
import style from "../styles/userProfile.module.scss";

const UserProfile: FC = () => {
  return (
    <>
      <button>
        <Link to="/">
          <i className={`fa-solid fa-reply ${style.returnArrow}`}></i>
          Back to home
        </Link>
      </button>
      <span>Add new recipe</span>
      <button>
        <i className={`fa-solid fa-plus ${style.addRecipe}`}></i>
      </button>
      <AddRecipeForm />
    </>
  );
};

export default UserProfile;
