import { Route, Routes } from "react-router-dom";
import { FC, useContext, useEffect } from "react";
import StartPage from "../components/startPage/Index";
import UserProfile from "./UserProfile";
import Aos from "aos";
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/Signup";
import VerificationCode from "../components/auth/VerificationCode";
import Contact from "../components/contactPage/Contact";
import EmailVerification from "../components/auth/EmailVerification";
import NewPassword from "../components/auth/NewPassword";
import Start from "./Start";

import { AuthContext } from "../context/authContext";

const App: FC = () => {
  const { user, setUser } = useContext(AuthContext);

  console.log(user);

  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/recipes" element={<Start />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/passwort-vergessen"
          element={
            <EmailVerification placeholder="Bitte deine Email eingeben" />
          }
        />
        <Route
          path="/verifiziere-verifikationscode/:id"
          element={<VerificationCode />}
        />
        <Route path="/passwort-zuruecksetzen/:id" element={<NewPassword />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};
export default App;
