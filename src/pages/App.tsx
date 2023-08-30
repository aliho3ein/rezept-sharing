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
import CommentPage from "./CommentPage";

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
        <Route path="/recipe/:id" element={<CommentPage />} />
      </Routes>
    </>
  );
};
export default App;
