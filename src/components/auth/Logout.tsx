import React from "react";
import style from "../../styles/auth/logout.module.scss";
import Cookies from "js-cookie";
import { alertMassage } from "../../actions/alerts";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const handleLogout = () => {
    Cookies.remove("token");
    onLogout();
    alertMassage(`Logout successful `);
  };

  return (
    <button className={style.logoutButton} onClick={handleLogout}>
      Abmelden
    </button>
  );
};

export default LogoutButton;
