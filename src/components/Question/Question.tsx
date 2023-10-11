import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js";
import { QuestionStructure } from "../../types";
import Button from "../Button/Button";
import "./Question.css";
import useApi from "../../hooks/useApi/useApi";
import { useEffect } from "react";

interface QuestionProps {
  quizId: string;
  question: QuestionStructure;
  questionIndex: number;
  onAnswerQuestion: () => void;
}

const Question = ({
  quizId,
  question: { question, code, answers },
  questionIndex,
  onAnswerQuestion,
}: QuestionProps): React.ReactElement => {
  const { saveAnswer } = useApi();

  const checkAnswer = async (answerIndex: number) => {
    await saveAnswer(quizId, answerIndex, questionIndex);

    onAnswerQuestion();
  };

  useEffect(() => {
    setTimeout(() => {
      hljs.highlightAll();
    }, 500);
  }, []);

  return (
    <article className="question">
      <h2 className="question__title">{question}</h2>
      {code && (
        <pre className="question__code">
          <code className="language-javascript">{code}</code>
        </pre>
      )}
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
