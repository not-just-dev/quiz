import { useEffect, useState } from "react";
import useGame from "../../hooks/useGame/useGame";
import QuizInfo from "../QuizInfo/QuizInfo";
import Question from "../Question/Question";
import { QuestionStructure } from "../../types";
import useApi from "../../hooks/useApi/useApi";
import { AxiosError } from "axios";
import Results from "../Results/Results";

interface GameProps {
  userId: string;
  level: string;
  position: string;
}

const Game = ({ userId, level, position }: GameProps): React.ReactElement => {
  const { getQuizData, getCurrentQuestion } = useGame();

  const { getCurrentQuestionByQuizId, getQuizResultsByQuizId } = useApi();

  const [isReady, setIsReady] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [results, setResults] = useState<{
    answersCount: number;
    correctAnswersCount: number;
  } | null>(null);

  const [quizData, setQuizData] = useState({
    quizId: "",
    questionsCount: 0,
    endTime: new Date(),
  });

  const [currentQuestion, setCurrentQuestion] = useState<{
    question: QuestionStructure;
    index: number;
  }>({
    question: {
      id: "",
      question: "",
      answers: [],
    },
    index: 0,
  });

  if (!currentQuestion) {
    setHasEnded(true);
  }

  useEffect(() => {
    (async () => {
      const apiQuizData = await getQuizData(userId, level, position);
      setQuizData({
        ...apiQuizData,
        endTime: new Date(apiQuizData.endTime),
      });

      if (new Date(apiQuizData.endTime).getTime() <= Date.now()) {
        setHasEnded(true);
      }

      setIsReady(true);

      try {
        const { index, question } = await getCurrentQuestion(
          apiQuizData.quizId,
        );

        setCurrentQuestion({
          question,
          index,
        });
      } catch (error: unknown) {
        if ((error as AxiosError).response?.status === 404) {
          setHasEnded(true);
        }
      }
    })();
  }, [getCurrentQuestion, getQuizData, level, position, userId]);

  useEffect(() => {
    if (hasEnded) {
      (async () => {
        const { answersCount, correctAnswersCount } =
          await getQuizResultsByQuizId(quizData.quizId);

        setResults({ answersCount, correctAnswersCount });
      })();
    }
  }, [getQuizResultsByQuizId, hasEnded, quizData.quizId]);

  if (!isReady) {
    return <span>Cargando preguntas...</span>;
  }

  if (hasEnded && results) {
    return <Results results={results} />;
  }

  return (
    <>
      <QuizInfo
        currentQuestionIndex={currentQuestion.index}
        questionsCount={quizData.questionsCount}
        quizzEndTime={quizData.endTime}
        actionOnEndTime={() => setHasEnded(true)}
      />
      <Question
        quizId={quizData.quizId}
        question={currentQuestion.question}
        questionIndex={currentQuestion.index}
        onAnswerQuestion={async () => {
          try {
            const { question, index } = await getCurrentQuestionByQuizId(
              quizData.quizId,
            );

            setCurrentQuestion({ question, index });
          } catch (error) {
            if ((error as AxiosError).response?.status === 404) {
              setHasEnded(true);
            }
          }
        }}
      />
    </>
  );
};

export default Game;
