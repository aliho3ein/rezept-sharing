import { useState, FC } from "react";
import { Link } from "react-router-dom";
import style from "../../styles/auth/signin.module.scss";
import { alertMassage } from "../../actions/alerts";
import GoogleBtn from "./googleBtn/GoogleBtn";
import { useNavigate } from "react-router-dom";
import instance from "../../api/instance";

const Signin: FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    instance
      .post("/user/anmelden", formData)
      .then((res) => {
        if (res.status === 200) {
          alertMassage(res.data.message);
          navigate("/", { state: { username: res.data.user.username } });
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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
          <Link to="/signup" className={style.signup_link}>
            Registrieren
          </Link>
        </p>

        <div className={style.oder}>Oder</div>
        <button className={style.google}>
          <GoogleBtn />
        </button>
      </div>
    </div>
  );
};
export default Signin;
