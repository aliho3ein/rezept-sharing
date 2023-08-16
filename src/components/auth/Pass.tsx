import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "../../styles/auth/pass.module.scss";

const Pass = () => {
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={style.pass_container}>
      <div className={style.card_form}>
        <h2 className={style.card_title}>Passwort vergessen?</h2>
        <p className={style.card_paragraph}>
          {forgotPassword
            ? "Bitte dein neues Passwort erneut eingeben."
            : "Bitte dein neues Passwort eingeben."}
        </p>
        {forgotPassword ? (
          <>
            <div className={style.input}>
              <label htmlFor="newPassword">
                <i className="fas fa-lock"></i>
              </label>
              <input
                id="newPassword"
                className={style.input__input}
                type={showNewPassword ? "text" : "password"}
                placeholder="Neues Passwort anfordern"
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
              />
              <i
                className={`fas ${
                  showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={handleShowConfirmPassword}
              ></i>
            </div>
            <button className={style.btn} type="button">
              <span className={style.text}>Zurück zur Anmeldung</span>
            </button>
          </>
        ) : (
          <>
            <div className={style.input}>
              <label htmlFor="newPassword">
                <i className="fas fa-lock"></i>
              </label>
              <input
                id="newPassword"
                className={style.input__input}
                type={showNewPassword ? "text" : "password"}
                placeholder="Neues Passwort anfordern"
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
              />
              <i
                className={`fas ${
                  showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={handleShowConfirmPassword}
              ></i>
            </div>
            <button className={style.btn} type="button">
              <span className={style.text}>Passwort zurücksetzen</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Pass;
