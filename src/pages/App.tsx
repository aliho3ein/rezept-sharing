import { Route, Routes } from "react-router-dom";
import { FC, useEffect } from "react";
import StartPage from "../components/startPage/Index";
import Aos from "aos";

const App: FC = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
      </Routes>
    </>
  );
};

export default App;
