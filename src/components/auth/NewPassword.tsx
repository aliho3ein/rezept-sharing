import { FC, useState } from "react";
import style from "../../styles/auth/newPassword.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { alertMassage } from "../../actions/alerts";

const NewPassword: FC = () => {
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const email = location.state.email;

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const updatePassword = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/passwort-zuruecksetzen/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            confirmPassword,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alertMassage(data.message, "success");
        navigate("/anmelden");
      } else {
        alertMassage(data.error || data.errors, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.pass_container}>
      <div className={style.card_form}>
        <h2 className={style.card_title}>Neues Passwort</h2>
        <p className={style.card_paragraph}>
          Bitte{" "}
          {password
            ? "dein neues Passwort erneut eingeben"
            : "dein neues Passwort eingeben"}
        </p>
        <p className={style.emailParagraph}>{email}</p>
        <div className={style.input}>
          <label htmlFor="newPassword">
            <i className="fas fa-lock"></i>
          </label>
          <input
            id="newPassword"
            className={style.input__input}
            type={showNewPassword ? "text" : "password"}
            placeholder="Neues Passwort anfordern"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={handleShowNewPassword}
          ></i>
        </div>
        <div className={style.input}>
          <label htmlFor="confirmPassword">
            <i className="fas fa-lock"></i>
          </label>
          <input
            id="confirmPassword"
            className={style.input__input}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Neues Passwort erneut eingeben."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <i
            className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={handleShowConfirmPassword}
          ></i>
        </div>
        <button className={style.btn} onClick={updatePassword}>
          <span className={style.text}>
            {password ? "Passwort ändern" : "Passwort zurücksetzen"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
