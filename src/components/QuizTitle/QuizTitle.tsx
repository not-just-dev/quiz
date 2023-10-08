import useGameStore from "../../store";
import "./QuizTitle.css";

const QuizTitle = (): React.ReactElement => {
  const { quizLevel, quizPosition } = useGameStore((state) => state);

  return (
    <div className="quizz-title">
      <p>Puesto: {quizPosition}</p>
      <p>Nivel: {quizLevel}</p>
    </div>
  );
};

export default QuizTitle;
