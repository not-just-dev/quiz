import { Routes, Route, Navigate } from "react-router-dom";
import InitQuizPage from "../../pages/InitQuizPage/InitQuizPage";
import Layout from "../Layout/Layout";
import EndPage from "../../pages/EndPage/EndPage";
import QuizPage from "../../pages/QuizPage/QuizPage";

const App = (): React.ReactElement => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/init-quiz" />} />
        <Route path="/init-quiz" element={<InitQuizPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/end" element={<EndPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
