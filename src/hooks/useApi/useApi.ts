import axios from "axios";
import { useCallback } from "react";
import { QuestionStructure, QuizData } from "../../types";
import useGameStore from "../../store";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const useApi = () => {
  const { showLoading, hideLoading } = useGameStore((state) => state);

  const getQuizDataByUserId = useCallback(
    async (userId: string, level: string, position: string) => {
      showLoading();

      const {
        data: {
          quizId,
          position: positionName,
          duration,
          questionsCount,
          endTime,
          isDone,
          hasStarted,
        },
      } = await axios.get<QuizData>(
        `quizzes/${userId}?level=${level}&position=${position}`,
      );

      hideLoading();

      return {
        quizId,
        level,
        position: positionName,
        questionsCount,
        duration,
        endTime,
        isDone,
        hasStarted,
      };
    },
    [hideLoading, showLoading],
  );

  const getQuizResultsByQuizId = useCallback(
    async (quizId: string) => {
      showLoading();

      const {
        data: { stats },
      } = await axios.get<{
        stats: {
          answersCount: number;
          correctAnswersCount: number;
        };
      }>(`quizzes/results/${quizId}`);

      hideLoading();

      return stats;
    },
    [hideLoading, showLoading],
  );

  const getCurrentQuestionByQuizId = useCallback(
    async (quizId: string) => {
      showLoading();

      const { data } = await axios.get<{
        question: QuestionStructure;
        index: number;
      }>(`quizzes/current-question/${quizId}`);

      hideLoading();

      return data;
    },
    [hideLoading, showLoading],
  );

  const checkMemberKey = useCallback(
    async (memberId: string, key: string) => {
      showLoading();

      const {
        data: { token },
      } = await axios.get<{ token: string }>(
        `members/check-key/${memberId}/${key}`,
      );

      hideLoading();

      return token;
    },
    [hideLoading, showLoading],
  );

  const getCurrentTime = useCallback(async () => {
    showLoading();

    const {
      data: { now },
    } = await axios.get<{ now: number }>("quizzes/current-time");

    hideLoading();

    return now;
  }, [hideLoading, showLoading]);

  const setCompleted = useCallback(
    async (quizId: string) => {
      showLoading();

      await axios.patch(`quizzes/set-completed?quizId=${quizId}`);

      hideLoading();
    },
    [hideLoading, showLoading],
  );

  const setStarted = useCallback(
    async (quizId: string) => {
      showLoading();

      await axios.patch(`quizzes/set-started?quizId=${quizId}`);

      hideLoading();
    },
    [hideLoading, showLoading],
  );

  const saveAnswer = useCallback(
    async (quizId: string, answerIndex: number, questionIndex: number) => {
      showLoading();

      await axios.patch(
        `quizzes/save-answer?quizId=${quizId}&answerIndex=${answerIndex}&questionIndex=${questionIndex}`,
      );

      hideLoading();
    },
    [hideLoading, showLoading],
  );

  const deleteQuiz = useCallback(
    async (quizId: string) => {
      showLoading();

      await axios.delete(`quizzes/${quizId}`);

      hideLoading();
    },
    [hideLoading, showLoading],
  );

  return {
    getQuizDataByUserId,
    getQuizResultsByQuizId,
    getCurrentQuestionByQuizId,
    getCurrentTime,
    checkMemberKey,
    setCompleted,
    setStarted,
    saveAnswer,
    deleteQuiz,
  };
};

export default useApi;
