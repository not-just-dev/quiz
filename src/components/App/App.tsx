import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import EndPage from "../../pages/EndPage/EndPage";
import QuizPage from "../../pages/QuizPage/QuizPage";
import CheckQuiz from "../CheckQuiz/CheckQuiz";
import HomePage from "../../pages/HomePage/HomePage";

const App = (): React.ReactElement => {
  const queryParams = window.location.search;

  return (
    <CheckQuiz>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to={`/home${queryParams}`} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/end" element={<EndPage />} />
        </Routes>
      </Layout>
    </CheckQuiz>
  );
};

export default App;
