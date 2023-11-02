import { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser/useUser";
import useQueryParams from "../../hooks/useQueryParams/useQueryParams";
import useGame from "../../hooks/useGame/useGame";
import useGameStore from "../../store";

const CheckQuiz = ({ children }: PropsWithChildren): React.ReactElement => {
  const { getUserId } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { key, memberId, level, position } = useQueryParams();
  const { getQuizData } = useGame();
  const {
    setQuizId,
    setQuizLevel,
    setQuizPosition,
    setQuizDuration,
    setQuizTotalQuestions,
    setIsAdmin,
  } = useGameStore((state) => state);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (location.pathname === "/end" && location.search.includes("error=1")) {
      setIsReady(true);

      return;
    }

    (async () => {
      try {
        await getUserId(memberId!, key!);

        const apiQuizData = await getQuizData(memberId!, level!, position!);

        setQuizId(apiQuizData.quizId);
        setQuizLevel(apiQuizData.level);
        setQuizPosition(apiQuizData.position);
        setQuizTotalQuestions(apiQuizData.questionsCount);
        setQuizDuration(apiQuizData.duration);

        if (location.search.includes("admin=mariogl")) {
          setIsAdmin();
        }

        if (
          (location.pathname === "/end" && !apiQuizData.isDone) ||
          (location.pathname === "/home" && apiQuizData.hasStarted)
        ) {
          navigate(`/quiz${location.search}`);
          return;
        }

        if (
          (location.pathname === "/quiz" || location.pathname === "/end") &&
          !apiQuizData.hasStarted
        ) {
          navigate(`/home${location.search}`);
          return;
        }

        setIsReady(true);
      } catch {
        navigate("/end?error=1");

        return <></>;
      }
    })();
  }, [
    getQuizData,
    getUserId,
    key,
    level,
    location.pathname,
    location.search,
    memberId,
    navigate,
    position,
    setIsAdmin,
    setQuizDuration,
    setQuizId,
    setQuizLevel,
    setQuizPosition,
    setQuizTotalQuestions,
  ]);

  return <>{isReady ? children : null}</>;
};

export default CheckQuiz;
