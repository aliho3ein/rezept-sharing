import { useState, FC } from "react";
import style from "../../styles/auth/signup.module.scss";
//import instance from "../../api/instance";
import { alertMassage } from "../../actions/alerts";
import GoogleBtn from "./googleBtn/GoogleBtn";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>("");

  const navigate = useNavigate();

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const userData = {
        username,
        email,
        dateOfBirth,
        password,
        confirmPassword,
      };

      const response = await fetch("http://localhost:3000/user/registrieren", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.ok) {
        alertMassage(data.message, "success");
        navigate("/anmelden");
      } else {
        alertMassage(data.error || data.errors, "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={style.signin_container}>
      <div className={style.card_form}>
        <h2 className={style.card_title}>Registrieren</h2>
        <p className={style.card_paragraph}>
          Bitte gib deine Daten ein, um dich zu registrieren.
        </p>

        <div className={style.input}>
          <label htmlFor="username">
            <i className="fas fa-user"></i>
          </label>
          <input
            id="username"
            type="text"
            placeholder="Benutzername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={style.input}>
          <label htmlFor="email">
            <i className="fas fa-envelope"></i>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={style.input}>
          <label htmlFor="password">
            <i className="fas fa-lock"></i>
          </label>
          <input
            id="password"
            placeholder="Passwort"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
            onClick={handleShowPasswordToggle}
          ></i>
        </div>
        <div className={style.input}>
          <label htmlFor="confirmPassword">
            <i className="fas fa-lock"></i>
          </label>
          <input
            id="confirmPassword"
            placeholder="Passwort bestätigen"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <i
            className={showConfirmPassword ? "fas fa-eye" : "fas fa-eye-slash"}
            onClick={handleShowConfirmPasswordToggle}
          ></i>
        </div>
        <div className={style.input}>
          <label htmlFor="birthdate">
            <i className="fas fa-calendar"></i>
          </label>
          <input
            id="birthdate"
            type="date"
            placeholder="Geburtsdatum"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <button className={style.btn} type="button" onClick={handleSignup}>
          <span className={style.text}>Registrieren</span>
        </button>

        <p className={style.signup_link}>
          Hast du keine Konto?
          <Link to="/anmelden" className={style.signup_link}>
            Anmelden
          </Link>
        </p>

        <div className={style.oder}>Order</div>

        <button className={style.google}>
          <GoogleBtn />
        </button>
      </div>
    </div>
  );
};

export default Signup;
