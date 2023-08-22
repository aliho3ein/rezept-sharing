// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import {
//   GoogleOAuthProvider,
//   GoogleLogin,
//   GoogleLoginProps,
// } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
// import style from "../../../styles/auth/signin.module.scss";
// import { alertMassage } from "../../../actions/alerts";

// interface DecodedToken {
//   name: string;
// }

// const ClientID =
//   "18690519048-ean2nk7fi4pg51rtv7np1q6gek9c9voo.apps.googleusercontent.com";

// const GoogleBtn: React.FC = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const authToken = Cookies.get("authToken");
//     const storedUserName = Cookies.get("userName");

//     if (authToken) {
//       setLoggedIn(true);
//       setUserName(storedUserName || "");
//     }
//   }, []);

//   const handleLoginSuccess: GoogleLoginProps["onSuccess"] = (response) => {
//     const jwtToken = response.credential;
//     const decodedToken = jwt_decode(jwtToken as string) as DecodedToken;
//     const name = decodedToken.name;

//     Cookies.set("authToken", jwtToken as string, { expires: 7 });
//     Cookies.set("userName", name, { expires: 7 });

//     setUserName(name);
//     setLoggedIn(true);
//   };

//   const handleLoginError: GoogleLoginProps["onError"] = () => {
//     console.log("Login Failed");
//   };

//   const handleLogout = () => {
//     // Clear cookies and reset state
//     Cookies.remove("authToken");
//     Cookies.remove("userName");
//     setLoggedIn(false);
//     setUserName("");
//     alertMassage(`Logout successful ${userName}`, "success");
//   };

//   return (
//     <GoogleOAuthProvider clientId={ClientID}>
//       <div className={style.googleButton}>
//         {loggedIn ? (
//           <>
//             <p>Welcome, {userName}!</p>
//             <button className={style.logoutButton} onClick={handleLogout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <GoogleLogin
//             onSuccess={handleLoginSuccess}
//             onError={handleLoginError}
//           />
//         )}
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleBtn;

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
    const decodedToken = jwt_decode(jwtToken as string) as DecodedToken;
    console.log(decodedToken);

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
