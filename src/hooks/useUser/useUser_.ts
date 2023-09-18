import { useState, useEffect } from "react";
import useLocalStorage from "../useLocalStorage/useLocalStorage";
import useApi from "../useApi/useApi";

const useUser = () => {
  const [isLogged, setIsLogged] = useState(false);

  const { getLocalData, setLocalData, cleanLocalData } = useLocalStorage();

  const { checkMemberKey } = useApi();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const memberId = queryParams.get("id");
    const key = queryParams.get("key");
    const level = queryParams.get("level");
    const position = queryParams.get("position");

    if (memberId && key) {
      cleanLocalData();

      (async () => {
        const token = await checkMemberKey(memberId, key);

        setLocalData(token, level!, position!);

        const currentUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, "", currentUrl);
      })();

      return;
    }
  });
};

export default useUser;
