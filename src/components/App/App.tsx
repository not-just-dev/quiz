import jwtDecode from "jwt-decode";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { QuestionStructure } from "../../types";
import Question from "../Question/Question";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const App = (): React.ReactElement => {
  const [isLogged, setIsLogged] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [, setUserId] = useState("");
  const [quizId, setQuizId] = useState("");
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionStructure | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const memberId = queryParams.get("id");
    const key = queryParams.get("key");

    if (memberId || key) {
      localStorage.removeItem("token");

      (async () => {
        const { data } = await axios.get<{ token: string }>(
          `members/check-key/${memberId}/${key}`,
        );

        localStorage.setItem("token", data.token);

        const currentUrl = window.location.origin + window.location.pathname;
        window.location.replace(currentUrl);
      })();
    }

    const token = localStorage.getItem("token");

    if (token) {
      const userId = jwtDecode<{ memberId: string }>(token).memberId;

      setIsLogged(true);
      setUserId(userId);

      (async () => {
        const {
          data: { quizId },
        } = await axios.get<{ quizId: string }>(`quizzes/${userId}`);

        setQuizId(quizId);
        try {
          const {
            data: { question, index },
          } = await axios.get<{ question: QuestionStructure; index: number }>(
            `quizzes/current-question/${quizId}`,
          );

          setCurrentQuestion(question);
          setCurrentQuestionIndex(index);
        } catch (error) {
          if ((error as AxiosError).response?.status === 404) {
            setHasEnded(true);
          }
        }
      })();
    }

    setTimeout(() => setIsReady(true), 500);
  }, []);

  return isReady ? (
    isLogged ? (
      <>
        {currentQuestion && !hasEnded && (
          <Question
            quizId={quizId}
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            onAnswerQuestion={async () => {
              try {
                const {
                  data: { question, index },
                } = await axios.get<{
                  question: QuestionStructure;
                  index: number;
                }>(`quizzes/current-question/${quizId}`);

                setCurrentQuestion(question);
                setCurrentQuestionIndex(index);
              } catch (error) {
                if ((error as AxiosError).response?.status === 404) {
                  setHasEnded(true);
                }
              }
            }}
          />
        )}
        {hasEnded && (
          <>
            <p>Gracias por realizar el test, aquí tienes tus resultados:</p>
            <p></p>
          </>
        )}
      </>
    ) : (
      <p>
        El link ha expirado o la autenticación ha fallado, genera un nuevo link.
      </p>
    )
  ) : (
    <p>Autenticando...</p>
  );
};

export default App;
