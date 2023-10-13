import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useGame from "../../hooks/useGame/useGame";
import useQueryParams from "../../hooks/useQueryParams/useQueryParams";
import { QuestionStructure, QuizData } from "../../types";
import QuizInfo from "../../components/QuizInfo/QuizInfo";
import Question from "../../components/Question/Question";
import useApi from "../../hooks/useApi/useApi";
import { AxiosError } from "axios";
import useGameStore from "../../store";

const QuizPage = (): React.ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  const { memberId, level, position } = useQueryParams();
  const { getQuizData, getCurrentQuestion } = useGame();
  const { getCurrentQuestionByQuizId, setCompleted } = useApi();
  const { setQuizId } = useGameStore((state) => state);

  const [quizData, setQuizData] = useState<QuizData>({
    quizId: "",
    questionsCount: 0,
    endTime: new Date(),
    isDone: false,
    level: "",
    position: "",
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

  useEffect(() => {
    (async () => {
      try {
        const apiQuizData = await getQuizData(memberId!, level!, position!);

        setQuizId(apiQuizData.quizId);

        if (apiQuizData.isDone) {
          navigate(`/end${location.search}`);
          return <></>;
        }

        if (new Date(apiQuizData.endTime).getTime() <= Date.now()) {
          await setCompleted(apiQuizData.quizId);

          navigate(`/end${location.search}`);
          return <></>;
        }

        if (apiQuizData)
          setQuizData({
            ...apiQuizData,
            endTime: new Date(apiQuizData.endTime),
          });

        const { index, question } = await getCurrentQuestion(
          apiQuizData!.quizId,
        );

        setCurrentQuestion({
          question,
          index,
        });
      } catch {
        navigate("/end?error=1");

        return <></>;
      }
    })();
  }, [
    getCurrentQuestion,
    getQuizData,
    level,
    location.search,
    memberId,
    navigate,
    position,
    setCompleted,
    setQuizId,
  ]);

  return (
    <>
      <QuizInfo
        currentQuestionIndex={currentQuestion.index}
        questionsCount={quizData.questionsCount}
        quizzEndTime={quizData.endTime}
        actionOnEndTime={() => navigate(`/end${location.search}`)}
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
              navigate(`/end${location.search}`);
            }
          }
        }}
      />
    </>
  );
};

export default QuizPage;
