import axios from "axios";
import { QuestionStructure } from "../../types";
import Button from "../Button/Button";
import "./Question.css";

interface QuestionProps {
  quizId: string;
  question: QuestionStructure;
  questionIndex: number;
}

const Question = ({
  quizId,
  question: { question, answers },
  questionIndex,
}: QuestionProps): React.ReactElement => {
  const checkAnswer = async (answerIndex: number) => {
    await axios.get(
      `quizzes/check-answer?quizId=${quizId}&answerIndex=${answerIndex}&questionIndex=${questionIndex}`,
    );
  };

  return (
    <article className="question">
      <h2>{question}</h2>
      <div className="question__answers">
        {answers.map((answer, position) => (
          <Button key={position} actionOnClick={() => checkAnswer(position)}>
            {answer}
          </Button>
        ))}
      </div>
    </article>
  );
};

export default Question;
