import { FC } from "react";
import style from "../../styles/userProfile/userProfile.module.scss";
import { Link } from "react-router-dom";
import DropDownUserProfile from "../dropDownUserProfile/DropDownUserProfile";

const ProfileHeader: FC = () => {
  return (
    <header>
      <nav className={style.navigationContainer}>
        <ul className={style.navigationLinksContainer}>
          <li>
            <Link to="/" className={style.navigationLinks}>
              Startseite
            </Link>
          </li>
          <li>
            <Link to="/recipes" className={style.navigationLinks}>
              Rezepte
            </Link>
          </li>
          <li>
            <Link to="#" className={style.navigationLinks}>
              Communities
            </Link>
          </li>
          <li>
            <Link to="#" className={style.navigationLinks}>
              Meal Planner
            </Link>
          </li>
          <li>
            <Link to="#" className={style.navigationLinks}>
              Einkaufsliste
            </Link>
          </li>
        </ul>
        <div>
          <div className={style.searchInputContainer}>
            <i className={`fa-solid fa-search ${style.searchIcon}`}></i>
            <input
              type="text"
              maxLength={255}
              placeholder="Suchen"
              className={style.searchInput}
            />
            <i className={`fa-solid fa-bell ${style.notificationBell}`}></i>
          </div>
          <DropDownUserProfile />
        </div>
      </nav>
    </header>
  );
};

export default ProfileHeader;
