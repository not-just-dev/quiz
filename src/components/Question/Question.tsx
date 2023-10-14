import { QuestionStructure } from "../../types";
import Button from "../Button/Button";
import "./Question.css";
import useApi from "../../hooks/useApi/useApi";
import CodeSnippet from "../CodeSnippet/CodeSnippet";

interface QuestionProps {
  quizId: string;
  question: QuestionStructure;
  questionIndex: number;
  onAnswerQuestion: () => void;
}

const Question = ({
  quizId,
  question: { question, code, language, answers },
  questionIndex,
  onAnswerQuestion,
}: QuestionProps): React.ReactElement => {
  const { saveAnswer } = useApi();

  const checkAnswer = async (answerIndex: number) => {
    await saveAnswer(quizId, answerIndex, questionIndex);

    onAnswerQuestion();
  };

  return (
    <article className="question">
      <h2 className="question__title">{question}</h2>
      {code && <CodeSnippet code={code} language={language} />}
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
