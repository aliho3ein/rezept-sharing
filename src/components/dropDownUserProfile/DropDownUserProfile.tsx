import { FC, useContext, useState } from "react";
import style from "../../styles/dropDownUserProfile/DropDownUserProfile.module.scss";
import LogoutButton from "../auth/Logout";
import Cookies from "js-cookie";
import { alertMassage } from "../../actions/alerts";
import { useNavigate, useLocation, Link } from "react-router-dom";
import avatarPic from "../../assets/avatar.jpg";
import { AuthContext } from "../../context/authContext";

const DropDownUserProfile: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  /*   const username = location.state?.username;
  const id = location.state?.id;
  const email = location.state?.email; */
  const picture = location.state?.picture;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    alertMassage("Logout successful", "success");
    navigate("/signin");
  };

  return (
    <div className={style.userProfileContainer}>
      <img
        src={picture || avatarPic}
        alt="User"
        className={`${style.userProfilePictureDropDown} ${
          isDropdownOpen ? style.active : ""
        }`}
        onClick={toggleDropdown}
      />

      {isDropdownOpen && (
        <div className={style.dropdownContent}>
          <div className={style.userInfo}>
            <p className={style.username}>{user?.username}</p>
            <p className={style.email}>{user?.email}</p>
            <p style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>
              {user?._id}
            </p>
          </div>
          <ul className={style.dropdownMenu}>
            <li>Profil</li>
            <li>
              {" "}
              <Link to="/user-profile" className={style.newRecipes}>
                Neue Rezepte
              </Link>
            </li>
            <li>Wünschliste</li>
            <li>
              <LogoutButton onLogout={handleLogout} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownUserProfile;
