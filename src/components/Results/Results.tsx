import html2canvas from "html2canvas";
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

  const downloadImage = async () => {
    const container = document.querySelector(".container") as HTMLElement;

    const image = await html2canvas(container, {
      backgroundColor: "#fff",
      windowWidth: 800,
      ignoreElements: (element) => element.classList.contains("button"),
    });

    const link = document.createElement("a");

    link.download = "not-just-dev-quiz-results.png";
    link.href = image.toDataURL();
    link.click();
  };

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
      <div className="results-actions">
        <button className="button" onClick={downloadImage}>
          Descárgate una captura de tus resultados
        </button>
      </div>
    </>
  );
};

export default Results;
