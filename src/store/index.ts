import { create } from "zustand";
import { GameState } from "./types";

const useGameStore = create<GameState>()((set) => ({
  quizId: "",
  quizLevel: "",
  quizPosition: "",
  quizDuration: 0,
  quizTotalQuestions: 0,
  hasEnded: false,
  isLoading: false,
  isAdmin: false,
  setQuizId: (quizId: string) => set(() => ({ quizId })),
  setQuizLevel: (quizLevel: string) => set(() => ({ quizLevel })),
  setQuizPosition: (quizPosition: string) => set(() => ({ quizPosition })),
  setQuizDuration: (quizDuration: number) => set(() => ({ quizDuration })),
  setQuizTotalQuestions: (quizTotalQuestions: number) =>
    set(() => ({ quizTotalQuestions })),
  end: () => set(() => ({ hasEnded: true })),
  showLoading: () => set(() => ({ isLoading: true })),
  hideLoading: () => set(() => ({ isLoading: false })),
  setIsAdmin: () => set(() => ({ isAdmin: true })),
}));

export default useGameStore;
