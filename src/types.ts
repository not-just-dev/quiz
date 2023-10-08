export interface QuestionStructure {
  id: string;
  question: string;
  code?: string;
  answers: string[];
  index?: number;
}

export interface QuizData {
  quizId: string;
  level: string;
  position: string;
  questionsCount: number;
  endTime: Date;
  isDone: boolean;
}
