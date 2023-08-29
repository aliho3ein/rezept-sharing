import { Route, Routes } from "react-router-dom";
import { FC, useEffect } from "react";
import StartPage from "../components/startPage/Index";
import UserProfile from "./UserProfile";
import Aos from "aos";
import CommentPage from "./CommentPage";


const App: FC = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/recipes" element={<StartPage />} />

        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/comments" element={<CommentPage />} />
    
      </Routes>
    </>
  );
};

export default App;
