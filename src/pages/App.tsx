import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import StartPage from "../components/startPage/Index";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
      </Routes>
    </>
  );
};

export default App;
