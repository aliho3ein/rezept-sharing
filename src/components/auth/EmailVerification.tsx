import React, { useState } from "react";
import style from "../../styles/auth/emailVerification.module.scss";
import { useNavigate } from "react-router-dom";
import { alertMassage } from "../../actions/alerts";

interface EmailProps {
  placeholder: string;
}

const EmailVerification: React.FC<EmailProps> = ({ placeholder }) => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/user/passwort-vergessen",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alertMassage(data.message, "success");
        navigate(`/verifiziere-verifikationscode/${data.user._id}`, {
          state: {
            id: data.user._id,
            username: data.user.username,
            email: data.user.email,
          },
        });
      } else {
        alertMassage(data.error || data.errors, "error");
      }
      setEmail("");
    } catch (error) {
      console.log(error);
    }
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
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
