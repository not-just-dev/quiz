import { useEffect, useState } from "react";
import Results from "../../components/Results/Results";
import useApi from "../../hooks/useApi/useApi";
import useGameStore from "../../store";

const EndPage = (): React.ReactElement => {
  const { getQuizResultsByQuizId } = useApi();
  const { quizId } = useGameStore((state) => state);

  const queryParams = new URLSearchParams(window.location.search);

  const error = queryParams.get("error");

  const [results, setResults] = useState({
    answersCount: 0,
    correctAnswersCount: 0,
  });

  useEffect(() => {
    (async () => {
      if (!quizId) {
        return;
      }

      const { answersCount, correctAnswersCount } =
        await getQuizResultsByQuizId(quizId);

      setResults({
        answersCount,
        correctAnswersCount,
      });
    })();
  }, [getQuizResultsByQuizId, quizId]);

  return (
    <>
      {error ? (
        <>
          <p>
            Me resulta muy incómodo decirte esto, pero... ha habido un error.
          </p>
          <p>Vuelve a generar el comando en Discord y 🤞</p>
        </>
      ) : (
        <>
          <p>¡Enhorabuena! Has terminado el test.</p>
          <Results results={results} />
        </>
      )}
    </>
  );
};

export default EndPage;
