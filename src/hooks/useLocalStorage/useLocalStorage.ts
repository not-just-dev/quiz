import { useCallback } from "react";

const useLocalStorage = () => {
  const tokenItemName = "token";
  const levelItemName = "level";
  const positionItemName = "position";

  const getLocalData = useCallback(
    () => ({
      token: localStorage.getItem(tokenItemName),
      level: localStorage.getItem(levelItemName),
      position: localStorage.getItem(positionItemName),
    }),
    [],
  );

  const setLocalData = useCallback(
    (token: string, level: string, position: string) => {
      localStorage.setItem(tokenItemName, token);
      localStorage.setItem(levelItemName, level);
      localStorage.setItem(positionItemName, position);
    },
    [],
  );

  const cleanLocalData = useCallback(() => {
    localStorage.removeItem(tokenItemName);
    localStorage.removeItem(levelItemName);
    localStorage.removeItem(positionItemName);
  }, []);

  return {
    getLocalData,
    setLocalData,
    cleanLocalData,
  };
};

export default useLocalStorage;
