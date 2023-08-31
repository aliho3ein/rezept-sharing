import React, { useContext } from "react";
import style from "../../styles/auth/logout.module.scss";
import Cookies from "js-cookie";
import { alertMassage } from "../../actions/alerts";
import { AuthContext } from "../../context/authContext";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const { user, setUser } = useContext(AuthContext);
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userData");
    Cookies.remove("userId");
    setUser(undefined);
    onLogout();
    alertMassage(`Logout successful ${user?.username} `);
  };

  return (
    <button className={style.logoutButton} onClick={handleLogout}>
      Abmelden
    </button>
  );
};

export default LogoutButton;
