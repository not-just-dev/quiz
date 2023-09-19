import { useCallback } from "react";
import useApi from "../useApi/useApi";

const useGame = () => {
  const { getQuizDataByUserId, getCurrentQuestionByQuizId } = useApi();

  const getQuizData = useCallback(
    async (userId: string, level: string, position: string) => {
      const apiQuizData = await getQuizDataByUserId(userId, level, position);

      return apiQuizData;
    },
    [getQuizDataByUserId],
  );

  const getCurrentQuestion = useCallback(
    async (quizId: string) => {
      return await getCurrentQuestionByQuizId(quizId);
    },
    [getCurrentQuestionByQuizId],
  );

  return {
    getQuizData,
    getCurrentQuestion,
  };
};

export default useGame;
