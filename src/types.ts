export interface QuestionStructure {
  id: string;
  question: string;
  code?: string;
  language?: string;
  answers: string[];
  index?: number;
}

export interface QuizData {
  quizId: string;
  level: string;
  duration: number;
  position: string;
  questionsCount: number;
  endTime: Date;
  isDone: boolean;
  hasStarted: boolean;
}
