import { useCallback } from "react";

const useLocalStorage = () => {
  const tokenItemName = "token";

  const getLocalData = useCallback(
    () => ({
      token: localStorage.getItem(tokenItemName),
    }),
    [],
  );

  const setLocalData = useCallback((token: string) => {
    localStorage.setItem(tokenItemName, token);
  }, []);

  const cleanLocalData = useCallback(() => {
    localStorage.removeItem(tokenItemName);
  }, []);

  return {
    getLocalData,
    setLocalData,
    cleanLocalData,
  };
};

export default useLocalStorage;
