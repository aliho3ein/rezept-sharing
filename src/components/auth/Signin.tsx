import { useState, FC } from "react";
import { Link } from "react-router-dom";
import style from "../../styles/auth/signin.module.scss";
//import instance from "../../api/instance";
import { alertMassage } from "../../actions/alerts";
import GoogleBtn from "./googleBtn/GoogleBtn";
import { useNavigate } from "react-router-dom";

const Signin: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/anmelden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data.error, "JSON Error");

      if (response.ok) {
        alertMassage(data.message, "success");
        navigate("/", { state: { username: data.user.username } });
      } else {
        alertMassage(data.error || data.errors, "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={style.signin_container}>
      <div className={style.card_form}>
        <h2 className={style.card_title}>Anmelden</h2>

        <form onSubmit={handleSubmit}>
          <p className={style.card_paragraph}>
            Bitte gib deine E-Mail-Adresse und dein Passwort ein, um dich
            anzumelden.
          </p>
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
            <Link to="/passwort-vergessen">Password vergessen?</Link>
          </div>
          <button className={style.btn} type="submit">
            <span className={style.text}>Anmelden</span>
          </button>
        </form>
        <p className={style.signup_link}>
          Hast du keine Konto?
          <Link to="/registrieren" className={style.signup_link}>
            Registrieren

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
export default Signin;
