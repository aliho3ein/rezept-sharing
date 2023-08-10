import { useState, FC } from "react";
import style from "../../styles/auth/signup.module.scss";

const Signup: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [birthdate, setBirthdate] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleSignup = () => {};

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
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <button className={style.btn} type="button" onClick={handleSignup}>
          <span className={style.text}>Registrieren</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
