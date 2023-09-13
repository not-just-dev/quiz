import Timer from "../Timer/Timer";
import "./QuizInfo.css";

interface QuizInfoProps {
  currentQuestionIndex: number;
  questionsCount: number;
  quizzEndTime: Date;
}

const QuizInfo = ({
  currentQuestionIndex,
  questionsCount,
  quizzEndTime,
}: QuizInfoProps): React.ReactElement => {
  return (
    <div className="quizz-info">
      <span>
        Pregunta {currentQuestionIndex + 1} de {questionsCount}
      </span>
      <Timer endTime={quizzEndTime} />
    </div>
  );
};

export default QuizInfo;
