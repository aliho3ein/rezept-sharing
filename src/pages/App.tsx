import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import StartPage from "../components/startPage/Index";
import UserProfile from "./UserProfile";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </>
  );
};

export default App;
