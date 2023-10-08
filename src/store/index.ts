import { create } from "zustand";
import { GameState } from "./types";

const useGameStore = create<GameState>()((set) => ({
  quizId: "",
  hasEnded: false,
  isLoading: false,
  setQuizId: (quizId: string) => set(() => ({ quizId })),
  end: () => set(() => ({ hasEnded: true })),
  showLoading: () => set(() => ({ isLoading: true })),
  hideLoading: () => set(() => ({ isLoading: false })),
}));

export default useGameStore;
