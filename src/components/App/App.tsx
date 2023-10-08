import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import EndPage from "../../pages/EndPage/EndPage";
import QuizPage from "../../pages/QuizPage/QuizPage";
import CheckQuiz from "../CheckQuiz/CheckQuiz";

const App = (): React.ReactElement => {
  return (
    <CheckQuiz>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/init-quiz" />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/end" element={<EndPage />} />
        </Routes>
      </Layout>
    </CheckQuiz>
  );
};

export default App;
