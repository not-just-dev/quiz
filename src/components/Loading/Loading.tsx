import { useState, useEffect } from "react";
import "./Loading.css";

const Loading = (): React.ReactElement => {
  const delayInMilliseconds = 300;

  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, delayInMilliseconds);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {shouldShow && (
        <div className="loading">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
