import axios from "axios";
import { useCallback } from "react";
import { QuestionStructure } from "../../../types";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const useApi = () => {
  const getQuizzDataByUserId = useCallback(
    async (userId: string, level: string, position: string) => {
      const {
        data: { quizId, questionsCount, endTime },
      } = await axios.get<{
        quizId: string;
        questionsCount: number;
        endTime: Date;
      }>(`quizzes/${userId}?level=${level}&position=${position}`);

      return { quizId, questionsCount, endTime };
    },
    [],
  );

  const getQuizzResultsByQuizId = useCallback(async (quizId: string) => {
    const {
      data: { stats },
    } = await axios.get<{
      stats: {
        answersCount: number;
        correctAnswersCount: number;
      };
    }>(`quizzes/results/${quizId}`);

    return stats;
  }, []);

  const getCurrentQuestionByQuizId = useCallback(async (quizId: string) => {
    const { data } = await axios.get<{
      question: QuestionStructure;
      index: number;
    }>(`quizzes/current-question/${quizId}`);

    return data;
  }, []);

  const checkMemberKey = useCallback(async (memberId: string, key: string) => {
    const {
      data: { token },
    } = await axios.get<{ token: string }>(
      `members/check-key/${memberId}/${key}`,
    );

    return token;
  }, []);

  return {
    getQuizzDataByUserId,
    getQuizzResultsByQuizId,
    getCurrentQuestionByQuizId,
    checkMemberKey,
  };
};

export default useApi;
