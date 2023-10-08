export interface GameState {
  quizId: string;
  hasEnded: boolean;
  isLoading: boolean;
  setQuizId: (quizId: string) => void;
  end: () => void;
  showLoading: () => void;
  hideLoading: () => void;
}
