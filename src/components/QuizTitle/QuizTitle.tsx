import useApi from "../../hooks/useApi/useApi";
import useGameStore from "../../store";
import "./QuizTitle.css";
import { useFlags } from "flagsmith/react";

type FlagOptions = "beta";

const QuizTitle = (): React.ReactElement => {
  const flags = useFlags<FlagOptions>(["beta"]);

  const { quizLevel, quizPosition, quizId, isAdmin } = useGameStore(
    (state) => state,
  );
  const { deleteQuiz } = useApi();

  const isBeta = isAdmin && flags.beta.enabled;

  const resetQuiz = async () => {
    await deleteQuiz(quizId);

    window.location.reload();
  };

  return (
    <div className="quizz-title">
      Entrevista para el puesto de {quizPosition} {quizLevel}
      {isBeta && (
        <button className="button" onClick={resetQuiz}>
          New Quiz
        </button>
      )}
    </div>
  );
};

export default QuizTitle;
