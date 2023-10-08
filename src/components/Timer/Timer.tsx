import { useMemo, useState, useEffect } from "react";
import useGameStore from "../../store";
import useApi from "../../hooks/useApi/useApi";

interface TimerProps {
  endTime: number;
  actionOnEndTime: () => void;
}

const Timer = ({
  endTime,
  actionOnEndTime,
}: TimerProps): React.ReactElement => {
  const { quizId } = useGameStore((state) => state);
  const [millisecondsLeft, setMillisecondsLeft] = useState(
    endTime - Date.now(),
  );

  const { setCompleted } = useApi();

  const { minutesLeft, secondsLeft } = useMemo(() => {
    const minutesLeft = millisecondsLeft / 1000 / 60;
    const minutes = Math.floor(minutesLeft);
    const seconds = Math.floor((minutesLeft - minutes) * 60);

    return {
      minutesLeft: minutes,
      secondsLeft: seconds,
    };
  }, [millisecondsLeft]);

  const formatTime = (quantity: number) => quantity.toString().padStart(2, "0");

  useEffect(() => {
    const interval = setInterval(async () => {
      if (Date.now() >= endTime) {
        await setCompleted(quizId);

        actionOnEndTime();
        return;
      }

      setMillisecondsLeft(endTime - Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [endTime, actionOnEndTime, quizId, setCompleted]);

  return (
    <div className="timer">
      Tiempo restante:{" "}
      {minutesLeft >= 0 && secondsLeft >= 0 && (
        <>
          <span className="timer__quantity">{formatTime(minutesLeft)}</span>:
          <span className="timer__quantity">{formatTime(secondsLeft)}</span>
        </>
      )}
    </div>
  );
};

export default Timer;
