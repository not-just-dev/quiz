export interface QuestionStructure {
  id: string;
  question: string;
  answers: string[];
  index?: number;
}

export interface QuizData {
  quizId: string;
  questionsCount: number;
  endTime: Date;
  isDone: boolean;
}
