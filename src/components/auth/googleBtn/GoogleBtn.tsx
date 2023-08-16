import React from "react";
import style from "../../../styles/auth/signin.module.scss";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

const ClientID =
  "377046576265-pm281qdmthb4pbd332f16qoon9m33d41.apps.googleusercontent.com";

const GoogleBtn: React.FC = () => {
  const handleLoginSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("Login Success:", response);
  };

  const handleLoginFailure = (error: any) => {
    console.log("Login Failure:", error);
  };

  return (
    <div className={style.google_container}>
      <GoogleLogin
        className={style.google_btn}
        clientId={ClientID}
        buttonText="Login with Google"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleBtn;
