import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userWithId } from "../../models/user";
import instance from "../../api/instance";
import style from "../../styles/userProfile/userProfile.module.scss";
import Card from "../cardRecipe/Card";
import EditProfilePopup from "./EditProfilePopup";

const ProfileMainSection: FC = () => {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [userInfo, setUserInfo] = useState<userWithId | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    handleFetch(`/recipe/user/${id}`, setRecipes);
    handleFetch(`/user/${id}`, setUserInfo);
  }, [id, userInfo]);

  function handleFetch(endpoint: string, setData: Function) {
    instance
      .get(endpoint)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }

  return (
    <main className={style.userProfileMainSection}>
      <div className={style.profileIconsContainer}>
        <i className={`fa-solid fa-share-nodes`}></i>
        <i className={`fa-solid fa-gear`}></i>
      </div>
      <div className={style.userProfileDataContainer}>
        <div className={style.userProfileDataInnerContainer}>
          <img
            src={userInfo?.image?.[0]}
            alt="User Profile Image"
            className={style.profileImage}
          />
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            className={style.profilePictureFileInput}
          />
          <label htmlFor="profile-picture">
            <i
              className={`fa-solid fa-pen ${style.profilePictureFileInputIcon}`}
            ></i>
          </label>
          <span className={style.follows}>0 Gefolgt</span>
          <span className={style.follower}>0 Follower</span>
        </div>
        <button
          className={style.editProfile}
          onClick={() => setIsPopupOpen(true)}
        >
          Profil bearbeiten
        </button>
        {isPopupOpen && (
          <EditProfilePopup
            closePopup={setIsPopupOpen}
            userImage={userInfo?.image?.[0]}
          />
        )}
      </div>
      <p className={style.userBio}>{userInfo?.info?.[0]}</p>
      <section className={style.recipeSection}>
        {recipes.map((recipe, index) => (
          <Card data={recipe} key={index} />
        ))}
      </section>
      <Link
        to={`/create-recipe/${userInfo?._id}`}
        className={style.createRecipe}
      >
        <i className={`fa-solid fa-plus`}></i>
      </Link>
    </main>
  );
};

export default ProfileMainSection;
