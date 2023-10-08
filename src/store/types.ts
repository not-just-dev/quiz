export interface GameState {
  quizId: string;
  quizLevel: string;
  quizPosition: string;
  hasEnded: boolean;
  isLoading: boolean;
  setQuizId: (quizId: string) => void;
  setQuizLevel: (quizLevel: string) => void;
  setQuizPosition: (quizPosition: string) => void;
  end: () => void;
  showLoading: () => void;
  hideLoading: () => void;
}
