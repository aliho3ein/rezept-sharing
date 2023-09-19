import { Dispatch, FC, SetStateAction, useState } from "react";
import style from "../../styles/userProfile/editProfilePopup.module.scss";
import instance from "../../api/instance";
import { useParams } from "react-router-dom";
import { alertMassage } from "../../actions/alerts";

type EditProfilePopupProps = {
  closePopup: Dispatch<SetStateAction<boolean>>;
  userImage: string | undefined;
};

const EditProfilePopup: FC<EditProfilePopupProps> = ({
  closePopup,
  userImage,
}) => {
  const { id } = useParams();
  const [userDescription, setUserDescription] = useState<string>("");

  function handleProfileUpdate() {
    instance
      .put(`/user/${id}`, { info: userDescription })
      .then(() => alertMassage("Profil wurde aktualisiert"))
      .catch(() => alertMassage("Fehler beim Aktualisieren", "error"));
    closePopup(false);
    setUserDescription("");
  }

  function handleUserDescriptionChange(event: any) {
    setUserDescription(event.target.value);
  }

  return (
    <div className={style.transparentBackground}>
      <div className={style.editPopupProfileContainer}>
        <div className={style.editPopupHeaderContainer}>
          <i
            className={`fa-solid fa-arrow-left ${style.leavePopup}`}
            onClick={() => closePopup(false)}
          ></i>
          <h1 className={style.popupHeading}>Profil bearbeiten</h1>
        </div>
        <div className={style.popupInputContainer}>
          <img
            src={userImage}
            alt="User Profile Image"
            className={style.userProfileImage}
          />
          <input
            type="text"
            value="Jan"
            readOnly
            className={style.editPopupInput}
          />
          <input
            type="text"
            value="Folz"
            readOnly
            className={style.editPopupInput}
          />
          <input
            type="text"
            placeholder="Benutzername"
            className={style.editPopupInput}
          />
          <textarea
            onChange={handleUserDescriptionChange}
            id="description"
            value={userDescription}
            placeholder="Biographie"
            className={style.editPopupDescriptionArea}
          ></textarea>
        </div>
        <button
          onClick={handleProfileUpdate}
          type="button"
          className={style.saveBtn}
        >
          Speichern
        </button>
      </div>
    </div>
  );
};

export default EditProfilePopup;
