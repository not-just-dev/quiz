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
      <p>Total preguntas del test: {answersCount}</p>
      <p>Total preguntas acertadas: {correctAnswersCount}</p>
      <p>Porcentaje de aciertos: {correctAnswersPercentage.toFixed(2)}%</p>
    </>
  );
};

export default Results;
