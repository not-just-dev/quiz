import { QuestionStructure } from "../../types";
import Button from "../Button/Button";
import "./Question.css";
import useApi from "../../hooks/useApi/useApi";

interface QuestionProps {
  quizId: string;
  question: QuestionStructure;
  questionIndex: number;
  onAnswerQuestion: () => void;
}

const Question = ({
  quizId,
  question: { question, answers },
  questionIndex,
  onAnswerQuestion,
}: QuestionProps): React.ReactElement => {
  const { saveAnswer } = useApi();

  const checkAnswer = async (answerIndex: number) => {
    saveAnswer(quizId, answerIndex, questionIndex);

    onAnswerQuestion();
  };

  return (
    <article className="question">
      <h2 className="question__title">{question}</h2>
      <div className="question__answers">
        {answers.map((answer, position) => (
          <Button
            className="question__answer"
            key={position}
            actionOnClick={() => checkAnswer(position)}
          >
            {answer}
          </Button>
        ))}
      </div>
    </article>
  );
};

export default Question;
