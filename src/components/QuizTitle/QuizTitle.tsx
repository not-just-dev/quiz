import useGameStore from "../../store";
import "./QuizTitle.css";

const QuizTitle = (): React.ReactElement => {
  const { quizLevel, quizPosition } = useGameStore((state) => state);

  return (
    <div className="quizz-title">
      Entrevista para el puesto de {quizPosition} {quizLevel}
    </div>
  );
};

export default QuizTitle;
