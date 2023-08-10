import { useState, FC } from "react";
import { Link } from "react-router-dom";
import style from "../../styles/auth/signin.module.scss";
const Signin: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  /*   const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false); */
  return (
    <div className={style.signin_container}>
      <div className={style.card_form}>
        <h2 className={style.card_title}>Anmelden</h2>
        <p className={style.card_paragraph}>
          Bitte gib deine E-Mail-Adresse und dein Passwort ein, um dich
          anzumelden.
        </p>
        {/* <p style={{ color: isError ? "red" : "green" }}>{message}</p> */}
        <div className={style.input}>
          <label htmlFor="email">
            <i className="fas fa-envelope"></i>
          </label>
          <input
            id="email"
            type="email"
            placeholder="email"
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
            placeholder="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>
        <div className={style.forgotPassword}>
          <Link to="/forgot-password">Password vergessen?</Link>
        </div>
        <button className={style.btn} type="button">
          <span className={style.text}>Anmelden</span>
        </button>
        <p className={style.signup_link}>
          Hast du schon ein Konto?
          <Link
            to="/signup"
            className={style.signup_link}
            // style={{ marginLeft: "20px" }}
          >
            Sign Up
          </Link>
        </p>
        <div className={style.separator}>
          <span>oder</span>
        </div>
        <button className={style.btn}>
          <span className={style.text}>Mit Google anmelden</span>
        </button>
      </div>
    </div>
  );
};
export default Signin;
