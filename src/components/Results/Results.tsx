import "./Results.css";

interface ResultsProps {
  results: {
    answersCount: number;
    correctAnswersCount: number;
  };
}

const Results = ({
  results: { answersCount, correctAnswersCount },
}: ResultsProps): React.ReactElement => {
  const correctAnswersPercentage = Number.isNaN(
    correctAnswersCount / answersCount,
  )
    ? 0
    : (correctAnswersCount / answersCount) * 100;

  return (
    <>
      <p>Aquí tienes tus resultados:</p>
      <div className="results">
        <div className="results__result">
          Total preguntas del test:{" "}
          <div className="results__number">{answersCount}</div>
        </div>
        <div className="results__result">
          Total preguntas acertadas:{" "}
          <div className="results__number">{correctAnswersCount}</div>
        </div>
        <div className="results__result">
          Porcentaje de aciertos:{" "}
          <div className="results__number">
            {correctAnswersPercentage.toFixed(2)}%
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
