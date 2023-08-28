import React from "react";
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

export interface DecodedToken {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

const ClientID =
  "18690519048-ean2nk7fi4pg51rtv7np1q6gek9c9voo.apps.googleusercontent.com";

const GoogleBtn: React.FC = () => {
  const navigate = useNavigate();

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
        alertMassage(res.data.message + " " + res.data.user.username);
      })
      .catch((err) => {
        if (err.response) {
          const textError = err.response.data.error || err.response.data.errors;
          alertMassage(textError as string, "error");
        } else {
          alertMassage("Ein Fehler ist aufgetreten.", "error");
        }
      });

    Cookies.set("token", jwtToken as string, { expires: 7 });
    Cookies.set("userData", JSON.stringify(decodedToken), { expires: 7 });

    const { name, email, picture } = decodedToken;
    const logedGoogleUserId = decodedToken.sub;

    if (logedGoogleUserId) {
      navigate("/recipes", {
        state: {
          username: name,
          email: email,
          picture: picture,
        },
      });
    }
  };

  const handleLoginError: GoogleLoginProps["onError"] = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={ClientID}>
      <div className={style.googleButton}>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleBtn;
