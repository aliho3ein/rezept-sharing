import React from "react";
import style from "../../styles/auth/email.module.scss";

interface EmailProps {
  placeholder: string;
}

const Email: React.FC<EmailProps> = ({ placeholder }) => {
  return (
    <div className={style.email_container}>
      <div className={style.card_form}>
        <h2 className={style.card_title}>Passwort vergessen?</h2>
        <p className={style.card_paragraph}>
          Bitte gib deine E-Mail-Adresse ein.
        </p>
        <div className={style.input}>
          <label htmlFor="email">
            <i className="fas fa-envelope"></i>
          </label>
          <input
            id="email"
            className={style.input__input}
            type="email"
            placeholder={placeholder}
          />
        </div>
        <button className={style.btn} type="button">
          <span className={style.text}>E-Mail bestätigen</span>
        </button>
      </div>
    </div>
  );
};

export default Email;
