import React, { useState, useEffect } from "react";
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
interface DecodedToken {
  name: string;
}

const ClientID =
  "18690519048-ean2nk7fi4pg51rtv7np1q6gek9c9voo.apps.googleusercontent.com";

interface GoogleBtnProps {
  onLogout: () => void;
}

const GoogleBtn: React.FC<GoogleBtnProps> = ({ onLogout }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const authToken = Cookies.get("authToken");

    if (authToken) {
      setLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess: GoogleLoginProps["onSuccess"] = (response) => {
    const jwtToken = response.credential;
    const decodedToken = jwt_decode(jwtToken as string);
    console.log(decodedToken);
    // request to DB decodedToken.image
    /**
      
     data = {
      username : decodedToken.name
      email :decodedToken.email
      image: decodedToken.picture
     }
      
    instance.post("/user/googleCheck" , data).then(res => log(res))
     */

    Cookies.set("authToken", jwtToken as string, { expires: 7 });
    Cookies.set("userData", JSON.stringify(decodedToken), { expires: 7 });

    setLoggedIn(true);
    navigate("/");
  };

  const handleLoginError: GoogleLoginProps["onError"] = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={ClientID}>
      <div className={style.googleButton}>
        {loggedIn ? (
          <>
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
