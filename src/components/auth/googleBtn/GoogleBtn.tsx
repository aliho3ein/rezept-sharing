import React, { useState } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  GoogleLoginProps,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import style from "../../../styles/auth/signin.module.scss";
import { alertMassage } from "../../../actions/alerts";

const ClientID =
  "18690519048-ean2nk7fi4pg51rtv7np1q6gek9c9voo.apps.googleusercontent.com";

const GoogleBtn: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess: GoogleLoginProps["onSuccess"] = (response) => {
    const jwtToken = response.credential;
    const decodedToken = jwt_decode(jwtToken as string);
    console.log(decodedToken);
    setLoggedIn(true);
  };

  const handleLoginError: GoogleLoginProps["onError"] = () => {
    console.log("Login Failed");
  };

  const handleLogout = () => {
    // Simulated logout action
    alertMassage("Logout successful", "success");
    setLoggedIn(false);
  };

  return (
    <GoogleOAuthProvider clientId={ClientID}>
      <div className={style.googleButton}>
        {loggedIn ? (
          <>
            <button className={style.logoutButton} onClick={handleLogout}>
              Logout
            </button>
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
