import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faReply } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { Link } from "react-router-dom";
import AddRecipeForm from "../components/userProfile/AddRecipeForm";

const UserProfile: FC = () => {
  return (
    <>
      <button>
        <Link to="/">
          <FontAwesomeIcon icon={faReply} className="returnArrow" />
          Back to home
        </Link>
      </button>
      <span>Add new recipe</span>
      <button>
        <FontAwesomeIcon icon={faPlus} className="addRecipe" />
      </button>
      <AddRecipeForm />
    </>
  );
};

export default UserProfile;
