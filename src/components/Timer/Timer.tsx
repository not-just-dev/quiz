import { useMemo, useState, useEffect } from "react";

interface TimerProps {
  endTime: Date;
}

const Timer = ({ endTime }: TimerProps): React.ReactElement => {
  const [millisecondsLeft, setMillisecondsLeft] = useState(
    endTime.getTime() - Date.now(),
  );

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
    const interval = setInterval(() => {
      setMillisecondsLeft(endTime.getTime() - Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [endTime]);

  return (
    <div className="timer">
      Tiempo restante:{" "}
      <span className="timer__quantity">{formatTime(minutesLeft)}</span>:
      <span className="timer__quantity">{formatTime(secondsLeft)}</span>
    </div>
  );
};

export default Timer;
