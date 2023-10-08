import { create } from "zustand";
import { GameState } from "./types";

const useGameStore = create<GameState>()((set) => ({
  quizId: "",
  quizLevel: "",
  quizPosition: "",
  hasEnded: false,
  isLoading: false,
  setQuizId: (quizId: string) => set(() => ({ quizId })),
  setQuizLevel: (quizLevel: string) => set(() => ({ quizLevel })),
  setQuizPosition: (quizPosition: string) => set(() => ({ quizPosition })),
  end: () => set(() => ({ hasEnded: true })),
  showLoading: () => set(() => ({ isLoading: true })),
  hideLoading: () => set(() => ({ isLoading: false })),
}));

export default useGameStore;
