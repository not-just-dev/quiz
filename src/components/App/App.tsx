import jwtDecode from "jwt-decode";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { QuestionStructure } from "../../types";
import Question from "../Question/Question";
import Results from "../Results/Results";
import useApi from "../hooks/useApi/useApi";
import Header from "../Header/Header";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const App = (): React.ReactElement => {
  const [isLogged, setIsLogged] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [, setUserId] = useState("");
  const [quizId, setQuizId] = useState("");
  const [questionsCount, setQuestionsCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionStructure | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [results, setResults] = useState<{
    answersCount: number;
    correctAnswersCount: number;
  } | null>(null);

  const {
    getQuizzIdByUserId,
    getQuizzResultsByQuizId,
    getCurrentQuestionByQuizId,
    checkMemberKey,
  } = useApi();

  useEffect(() => {
    if (hasEnded) {
      (async () => {
        const { answersCount, correctAnswersCount } =
          await getQuizzResultsByQuizId(quizId);

        setResults({ answersCount, correctAnswersCount });
      })();
    }
  }, [getQuizzResultsByQuizId, hasEnded, quizId]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const memberId = queryParams.get("id");
    const key = queryParams.get("key");

    if (memberId && key) {
      localStorage.removeItem("token");

      (async () => {
        const token = await checkMemberKey(memberId, key);

        localStorage.setItem("token", token);

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
        const { quizId, questionsCount } = await getQuizzIdByUserId(userId);

        setQuizId(quizId);
        setQuestionsCount(questionsCount);
        try {
          const { question, index } = await getCurrentQuestionByQuizId(quizId);

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
  }, [getCurrentQuestionByQuizId, getQuizzIdByUserId]);

  return (
    <div className="container">
      <Header />
      {isReady ? (
        isLogged ? (
          <>
            {currentQuestion && !hasEnded && (
              <>
                <p>
                  Pregunta {currentQuestionIndex + 1} de {questionsCount}
                </p>
                <Question
                  quizId={quizId}
                  question={currentQuestion}
                  questionIndex={currentQuestionIndex}
                  onAnswerQuestion={async () => {
                    try {
                      const { question, index } =
                        await getCurrentQuestionByQuizId(quizId);

                      setCurrentQuestion(question);
                      setCurrentQuestionIndex(index);
                    } catch (error) {
                      if ((error as AxiosError).response?.status === 404) {
                        setHasEnded(true);
                      }
                    }
                  }}
                />
              </>
            )}
            {hasEnded && results && <Results results={results} />}
          </>
        ) : (
          <p>
            El link ha expirado o la autenticación ha fallado, genera un nuevo
            link.
          </p>
        )
      ) : (
        <p>Autenticando...</p>
      )}
    </div>
  );
};

export default App;
