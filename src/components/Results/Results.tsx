interface ResultsProps {
  results: {
    answersCount: number;
    correctAnswersCount: number;
  };
}

const Results = ({
  results: { answersCount, correctAnswersCount },
}: ResultsProps): React.ReactElement => {
  return (
    <>
      <p>Has finalizado el test, aquí tienes tus resultados:</p>
      <p>Total preguntas respondidas: {answersCount}</p>
      <p>Total preguntas acertadas: {correctAnswersCount}</p>
      <p>
        Porcentaje de aciertos:{" "}
        {((correctAnswersCount / answersCount) * 100).toFixed(2)}%
      </p>
    </>
  );
};

export default Results;
