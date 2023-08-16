import { Route, Routes } from "react-router-dom";
import { FC, useEffect } from "react";
import StartPage from "../components/startPage/Index";
import UserProfile from "./UserProfile";
import Aos from "aos";
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/Signup";
import VerificationCode from "../components/auth/VerificationCode";
import Contact from "../components/contactPage/Contact";
import EmailVerification from "../components/auth/EmailVerification";
import NewPassword from "../components/auth/NewPassword";

const App: FC = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/anmelden" element={<Signin />} />
        <Route path="/registrieren" element={<Signup />} />
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
