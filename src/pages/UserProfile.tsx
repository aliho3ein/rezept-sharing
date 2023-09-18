import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "../styles/userProfile/userProfile.module.scss";
import instance from "../api/instance";
import { userWithId } from "../models/user";
import Card from "../components/cardRecipe/Card";
import { alertMassage } from "../actions/alerts";

const UserProfile: FC = () => {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userDescription, setUserDescription] = useState<string>("");
  const [userInfo, setUserInfo] = useState<userWithId | null>(null);

  useEffect(() => {
    handleFetch(`/recipe/user/${id}`, setRecipes);
    handleFetch(`/user/${id}`, setUserInfo);
  }, [id, userDescription]);

  function handleFetch(endpoint: string, setData: Function) {
    instance
      .get(endpoint)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setUserDescription("");
  }

  function handleDescriptionEdit(event: any) {
    setUserDescription(event.target.value);
  }

  function handleSaveEdit() {
    instance
      .put(`/user/${id}`, { info: userDescription })
      .then(() => alertMassage("Beschreibung erfolgreich geändert"))
      .catch(() =>
        alertMassage("Fehler beim Ändern der Beschreibung", "error")
      );
    setIsEditing(false);
    setUserDescription("");
  }

  return (
    <section className={style.userProfileContainer}>
      <Link to="/recipes" className={style.backToFeed}>
        <i className={`fa-solid fa-arrow-left`}></i>
      </Link>

      {isEditing ? (
        <div className={style.editModeDescriptionContainer}>
          <div>
            <textarea
              value={userDescription}
              onChange={handleDescriptionEdit}
              className={style.descriptionEditArea}
            />
            <button
              onClick={handleSaveEdit}
              className={style.descriptionSaveBtn}
            >
              Speichern
            </button>
            <button
              onClick={handleCancelEdit}
              className={style.descriptionCancelBtn}
            >
              Abbrechen
            </button>
          </div>
        </div>
      ) : (
        <div className={style.currentDescriptionContainer}>
          <div className={style.currentDescriptionInnerWrapper}>
            {userInfo?.info?.length ? (
              <p className={style.userDescription}>{userInfo.info[0]}</p>
            ) : (
              <p className={style.userDescription}>
                Beschreibe hier deine bisherige kulinarische Reise, deine
                Lieblingsgerichte etc.
              </p>
            )}
            <button onClick={handleEdit} className={style.descriptionEditBtn}>
              Bearbeiten
            </button>
          </div>
          <img src={userInfo?.image?.[0]} className={style.userProfileImage} />
        </div>
      )}
      <main className={style.userRecipesContainer}>
        {recipes.length <= 0 ? (
          <p className={style.noRecipesYet}>
            Bisher hast du noch keine Rezepte..
          </p>
        ) : (
          recipes.map((recipe, index) => <Card key={index} data={recipe} />)
        )}
      </main>
      <Link
        to={`/create-recipe/${userInfo?._id}`}
        className={style.createRecipe}
      >
        <i className={`fa-solid fa-plus`}></i>
      </Link>
    </section>
  );
};

export default UserProfile;
