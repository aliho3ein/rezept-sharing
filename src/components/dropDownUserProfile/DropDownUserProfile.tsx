import { FC, useContext, useEffect, useState } from "react";
import style from "../../styles/dropDownUserProfile/DropDownUserProfile.module.scss";
import LogoutButton from "../auth/Logout";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import avatarPic from "../../assets/avatar.jpg";
import { AuthContext } from "../../context/authContext";
import instance from "../../api/instance";

const DropDownUserProfile: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [userImage, setUserImage] = useState<string | undefined>("");
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const userIdFromCookies = Cookies.get("userId");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (userIdFromCookies) {
      instance
        .get(`/user/${userIdFromCookies}`)
        .then((res) => {
          setUser(res.data);
          setUserImage(res.data.image[0]);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [userIdFromCookies, setUser]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userData");
    Cookies.remove("userId");
    navigate("/signin");
  };

  return (
    <div className={style.userProfileContainer}>
      <img
        src={userImage || avatarPic}
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
            {/*   <p style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>
              {user?._id}
            </p> */}
          </div>
          <ul className={style.dropdownMenu}>
            <li>
              <Link
                to={`/user-profile/${user?._id}`}
                className={style.newRecipes}
              >
                Profile
              </Link>
            </li>
            <li>
              {" "}
              <Link
                to={`/create-recipe/${user?._id}`}
                className={style.newRecipes}
              >
                Rezept erstellen
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
