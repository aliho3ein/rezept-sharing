/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState, FC, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import style from "../../styles/auth/signin.module.scss";
import { alertMassage } from "../../actions/alerts";
import GoogleBtn from "./googleBtn/GoogleBtn";
import { useNavigate } from "react-router-dom";
import instance from "../../api/instance";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../../context/authContext";
import { userWithId } from "../../models/user";

export interface DecodedToken {
  username: string;
  email: string;
}

const Signin: FC = () => {
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    instance
      .post("/user/anmelden", formData)
      .then((res) => {
        if (res.status === 200) {

          alertMassage(res.data.message + " " + res.data.user.username);

          const authToken = res.data.token;
          /* console.log(authToken); */

          Cookies.set("token", authToken, { expires: 7 });

          const loggedInUserId = res.data.user._id;
          console.log(loggedInUserId);

          if (loggedInUserId) {
            setUser({
              _id: loggedInUserId,
              ...res.data.user,
            } as userWithId);
            navigate("/recipes", {
              state: {
                /*                 id: loggedInUserId,
                username: res.data.user.username,
                email: res.data.user.email, */
              },
            });
          } else {
            navigate("/signin");
          }

        }
      })

      .catch((err) => {
        if (err.response) {
          const textError = err.response.data.error || err.response.data.errors;
          alertMassage(textError as string, "error");
        } else {
          alertMassage("Ein Fehler ist aufgetreten.", "error");
        }
      });
  };
  useEffect(() => {
    const authToken = Cookies.get("token");
    if (authToken) {
      try {
        const decodedToken = jwt_decode(authToken as string) as DecodedToken;
        navigate("/recipes", {
          state: {
            username: decodedToken.username,
            email: decodedToken.email,
          },
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userName");
    alertMassage("Logout successful", "success");

    console.log();
  };

  return (
    <>
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
              {/* <span className={style.text}>Anmelden</span> */}
              Anmelden
            </button>
          </form>
          <p className={style.signup_link}>
            Hast du keine Konto?
            <Link to="/signup" className={style.signup_link}>
              Registrieren
            </Link>
          </p>
          <div className={style.oder}>Oder</div>
          <GoogleBtn /* onLogout={handleLogout} */ />
        </div>
      </div>
    </>
  );
};

export default Signin;
