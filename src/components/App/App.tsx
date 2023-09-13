import jwtDecode from "jwt-decode";
import axios, { AxiosError } from "axios";
import { useRef, useEffect, useState } from "react";
import { QuestionStructure } from "../../types";
import Question from "../Question/Question";
import Results from "../Results/Results";
import useApi from "../hooks/useApi/useApi";
import Header from "../Header/Header";
import Timer from "../Timer/Timer";
import "./App.css";

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

  const quizzEndTime = useRef(new Date());

  const {
    getQuizzDataByUserId,
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
    let level = queryParams.get("level");
    let position = queryParams.get("position");

    if (memberId && key) {
      localStorage.removeItem("token");
      localStorage.removeItem("level");
      localStorage.removeItem("position");

      (async () => {
        const token = await checkMemberKey(memberId, key);

        localStorage.setItem("token", token);
        localStorage.setItem("level", level!);
        localStorage.setItem("position", position!);

        const currentUrl = window.location.origin + window.location.pathname;
        window.location.replace(currentUrl);
      })();

      return;
    }

    const token = localStorage.getItem("token");
    level = localStorage.getItem("level");
    position = localStorage.getItem("position");

    if (token) {
      const userId = jwtDecode<{ memberId: string }>(token).memberId;

      setIsLogged(true);
      setUserId(userId);

      (async () => {
        const { quizId, questionsCount, endTime } = await getQuizzDataByUserId(
          userId,
          level!,
          position!,
        );

        setQuizId(quizId);
        setQuestionsCount(questionsCount);
        quizzEndTime.current = new Date(endTime);

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
  }, [checkMemberKey, getCurrentQuestionByQuizId, getQuizzDataByUserId]);

  return (
    <div className="container">
      <Header />
      <main className="main-content">
        {isReady ? (
          isLogged ? (
            <>
              {currentQuestion && !hasEnded && (
                <>
                  <div className="info">
                    <span>
                      Pregunta {currentQuestionIndex + 1} de {questionsCount}
                    </span>
                    <Timer endTime={quizzEndTime.current} />
                  </div>
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
      </main>
    </div>
  );
};

export default App;
