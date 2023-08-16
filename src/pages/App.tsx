import { Route, Routes } from "react-router-dom";
import { FC, useEffect } from "react";
import StartPage from "../components/startPage/Index";
import UserProfile from "./UserProfile";
import Aos from "aos";
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/Signup";

const App: FC = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
