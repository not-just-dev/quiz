export interface GameState {
  quizId: string;
  quizLevel: string;
  quizPosition: string;
  quizTotalQuestions: number;
  quizDuration: number;
  hasEnded: boolean;
  isLoading: boolean;
  setQuizId: (quizId: string) => void;
  setQuizLevel: (quizLevel: string) => void;
  setQuizPosition: (quizPosition: string) => void;
  setQuizTotalQuestions: (quizTotalQuestions: number) => void;
  setQuizDuration: (quizDuration: number) => void;
  end: () => void;
  showLoading: () => void;
  hideLoading: () => void;
}
