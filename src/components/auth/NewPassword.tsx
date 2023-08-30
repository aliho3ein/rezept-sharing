import { FC, useState } from "react";
import style from "../../styles/auth/newPassword.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { alertMassage } from "../../actions/alerts";
import instance from "../../api/instance";

const NewPassword: FC = () => {
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });

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

  const updatePassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    instance
      .put(`/user/passwort-zuruecksetzen/${id}`, newPassword)
      .then((res) => {
        if (res.status === 200) {
          alertMassage(res.data.message);
          navigate("/signin");
        }
      })
      .catch((err) => {
        if (err.response) {
          const textError = err.response.data.error || err.response.data.errors;
          alertMassage(textError, "error");
        } else {
          alertMassage("Ein Fehler ist aufgetreten.", "error");
        }
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={style.pass_container}>
      <div className={style.card_form}>
        <h2 className={style.card_title}>Neues Passwort</h2>
        <p className={style.card_paragraph}>
          Bitte{" "}
          {newPassword.password
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
            name="password"
            className={style.input__input}
            type={showNewPassword ? "text" : "password"}
            placeholder="Neues Passwort anfordern"
            value={newPassword.password}
            onChange={handleChange}
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
            name="confirmPassword"
            className={style.input__input}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Neues Passwort erneut eingeben."
            value={newPassword.confirmPassword}
            onChange={handleChange}
          />
          <i
            className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={handleShowConfirmPassword}
          ></i>
        </div>
        <button className={style.btn} onClick={updatePassword}>
          {newPassword.password ? "Passwort ändern" : "Passwort zurücksetzen"}
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
