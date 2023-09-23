import Timer from "../Timer/Timer";
import "./QuizInfo.css";

interface QuizInfoProps {
  currentQuestionIndex: number;
  questionsCount: number;
  quizzEndTime: Date;
  actionOnEndTime: () => void;
}

const QuizInfo = ({
  currentQuestionIndex,
  questionsCount,
  quizzEndTime,
  actionOnEndTime,
}: QuizInfoProps): React.ReactElement => {
  return (
    <div className="quizz-info">
      <span>
        Pregunta {currentQuestionIndex + 1} de {questionsCount}
      </span>
      <Timer
        endTime={quizzEndTime.getTime()}
        actionOnEndTime={actionOnEndTime}
      />
    </div>
  );
};

export default QuizInfo;
