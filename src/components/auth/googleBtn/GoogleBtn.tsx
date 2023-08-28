/* import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  GoogleLoginProps,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import style from "../../../styles/auth/signin.module.scss";
import LogoutButton from "../Logout";
import { useNavigate } from "react-router-dom";
import instance from "../../../api/instance";
import { alertMassage } from "../../../actions/alerts";
interface DecodedToken {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

const ClientID =
  "18690519048-ean2nk7fi4pg51rtv7np1q6gek9c9voo.apps.googleusercontent.com";

interface GoogleBtnProps {
  onLogout: () => void;
}

const GoogleBtn: React.FC<GoogleBtnProps> = ({ onLogout }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const authToken = Cookies.get("authToken");
    const userData = Cookies.get("userData");
    console.log(userData);

    if (authToken && userData) {
      setLoggedIn(true);
      setUserId(JSON.parse(userData).sub);
    }
  }, []);

  const handleLoginSuccess: GoogleLoginProps["onSuccess"] = (response) => {
    const jwtToken = response.credential;
    const decodedToken = jwt_decode(jwtToken as string) as DecodedToken;
    console.log(decodedToken.sub);

    const data = {
      id: decodedToken.sub,
      username: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture,
    };
    instance
      .post("/user/checkgoogle", data)
      .then((res) => {
        alertMassage(res.data.message);
      })
      .catch((err) => {
        console.error("Error:", err);
        if (err.response) {
          const textError = err.response.data.error || err.response.data.errors;
          alertMassage(textError as string, "error");
        } else {
          alertMassage("Ein Fehler ist aufgetreten.", "error");
        }
      });

    Cookies.set("authToken", jwtToken as string, { expires: 7 });
    Cookies.set("userData", JSON.stringify(decodedToken), { expires: 7 });

    setLoggedIn(true);
    setUserId(decodedToken.sub);
    navigate("/recipes");
  };

  const handleLoginError: GoogleLoginProps["onError"] = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={ClientID}>
      <div className={style.googleButton}>
        {loggedIn ? (
          <>
            {navigate("/recipes")}
            <LogoutButton onLogout={onLogout} />
          </>
        ) : (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleBtn;
 */
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  GoogleLoginProps,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import style from "../../../styles/auth/signin.module.scss";
import { useNavigate } from "react-router-dom";
import instance from "../../../api/instance";
import { alertMassage } from "../../../actions/alerts";
import LogoutButton from "../Logout";
//import LogoutButton from "../Logout";

interface DecodedToken {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

const ClientID =
  "18690519048-ean2nk7fi4pg51rtv7np1q6gek9c9voo.apps.googleusercontent.com";

interface GoogleBtnProps {
  onLogout: () => void;
}

const GoogleBtn: React.FC<GoogleBtnProps> = ({ onLogout }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    const authToken = Cookies.get("authToken");
    const userData = Cookies.get("userData");

    if (authToken && userData) {
      setLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess: GoogleLoginProps["onSuccess"] = (response) => {
    const jwtToken = response.credential;
    const decodedToken = jwt_decode(jwtToken as string) as DecodedToken;

    const data = {
      id: decodedToken.sub,
      username: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture,
    };
    instance
      .post("/user/checkgoogle", data)
      .then((res) => {
        alertMassage(res.data.message);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
        if (err.response) {
          const textError = err.response.data.error || err.response.data.errors;
          alertMassage(textError as string, "error");
        } else {
          alertMassage("Ein Fehler ist aufgetreten.", "error");
        }
      });

    Cookies.set("authToken", jwtToken as string, { expires: 7 });
    Cookies.set("userData", JSON.stringify(decodedToken), { expires: 7 });

    setLoggedIn(true);
  };

  const handleLoginError: GoogleLoginProps["onError"] = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={ClientID}>
      <div className={style.googleButton}>
        {loggedIn ? (
          <>
            {navigate("/signin")}
            <LogoutButton onLogout={onLogout} />
          </>
        ) : (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleBtn;
