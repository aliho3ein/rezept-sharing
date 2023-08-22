import React, { useState } from "react";
import style from "../../styles/auth/emailVerification.module.scss";
import { useNavigate } from "react-router-dom";
import { alertMassage } from "../../actions/alerts";
import instance from "../../api/instance";

interface EmailProps {
  placeholder: string;
}

const EmailVerification: React.FC<EmailProps> = ({ placeholder }) => {
  const [emailVerificationData, setEmailVerificationData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    instance
      .post("/user/passwort-vergessen", emailVerificationData)
      .then((res) => {
        console.log("code", res.data.user.verificationCodeForgotPassword);

        if (res) {
          alertMassage(res.data.message);
          navigate(`/verifiziere-verifikationscode/${res.data.user._id}`, {
            state: { email: res.data.user.email, id: res.data.user._id },
          });
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
    setEmailVerificationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
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
            name="email"
            placeholder={placeholder}
            value={emailVerificationData.email}
            onChange={handleChange}
          />
        </div>
        <button className={style.btn} onClick={handleSubmit}>
          <span className={style.text}>E-Mail bestätigen</span>
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
