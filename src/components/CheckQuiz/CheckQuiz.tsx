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
  const { setQuizId } = useGameStore((state) => state);

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
    setQuizId,
  ]);

  return <>{isReady ? children : null}</>;
};

export default CheckQuiz;
