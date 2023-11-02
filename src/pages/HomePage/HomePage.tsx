import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import useGameStore from "../../store";
import useApi from "../../hooks/useApi/useApi";

const HomePage = (): React.ReactElement => {
  const navigate = useNavigate();

  const { setStarted } = useApi();
  const { quizTotalQuestions, quizDuration, quizId } = useGameStore();

  const start = async () => {
    try {
      await setStarted(quizId);

      const queryParams = window.location.search;

      navigate(`/quiz${queryParams}`);
    } catch {
      navigate(`/end?error=1`);
    }
  };

  return (
    <>
      <p>
        Vas a iniciar la simulación de entrevista técnica. Este test consta de{" "}
        {quizTotalQuestions} preguntas técnicas y tiene una duración máxima de{" "}
        {quizDuration / 60} minutos.
      </p>
      <p>Empieza cuando quieras y... ¡que salga muy bien!</p>
      <div className="actions">
        <Button className="button" actionOnClick={start}>
          Empezar
        </Button>
      </div>
    </>
  );
};

export default HomePage;
