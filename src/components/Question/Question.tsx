import { QuestionStructure } from "../../types";
import Button from "../Button/Button";
import "./Question.css";

interface QuestionProps {
  question: QuestionStructure;
}

const Question = ({
  question: { question, answers },
}: QuestionProps): React.ReactElement => {
  return (
    <article className="question">
      <h2>{question}</h2>
      <div className="question__answers">
        {answers.map((answer, position) => (
          <Button key={position} actionOnClick={() => {}}>
            {answer}
          </Button>
        ))}
      </div>
    </article>
  );
};

export default Question;
