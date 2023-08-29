import React, { useContext } from "react";
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
import { AuthContext } from "../../../context/authContext";
import { userWithId } from "../../../models/user";

export interface DecodedToken {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

const ClientID =
  "18690519048-ean2nk7fi4pg51rtv7np1q6gek9c9voo.apps.googleusercontent.com";

const GoogleBtn: React.FC = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginSuccess: GoogleLoginProps["onSuccess"] = (response) => {
    const jwtToken = response.credential;
    const decodedToken = jwt_decode(jwtToken as string) as DecodedToken;

    const data = {
      username: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture,
    };

    instance
      .post("/user/checkgoogle", data)
      .then((res) => {
        const logedGoogleUserId = res.data.user._id;
        /*         console.log("data", res.data.user); */

        alertMassage(res.data.message + " " + res.data.user.username);

        Cookies.set("token", jwtToken as string, { expires: 7 });
        Cookies.set("userData", JSON.stringify(decodedToken), { expires: 7 });

        const { name, email, picture } = decodedToken;

        if (logedGoogleUserId) {
          setUser({ _id: logedGoogleUserId } as userWithId);
          navigate("/recipes", {
            state: {
              id: logedGoogleUserId,
              username: name,
              email: email,
              picture: picture,
            },
          });
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
