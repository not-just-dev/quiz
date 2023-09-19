import jwtDecode from "jwt-decode";
import { useCallback, useRef } from "react";
import useApi from "../useApi/useApi";
import useLocalStorage from "../useLocalStorage/useLocalStorage";

const useUser = () => {
  const { checkMemberKey } = useApi();
  const { setLocalData, getLocalData, cleanLocalData } = useLocalStorage();

  const token = useRef("");

  const getUserId = useCallback(async () => {
    const queryParams = new URLSearchParams(window.location.search);

    const memberId = queryParams.get("id");
    const key = queryParams.get("key");
    const level = queryParams.get("level");
    const position = queryParams.get("position");

    if (memberId && key) {
      cleanLocalData();

      token.current = await checkMemberKey(memberId, key);

      setLocalData(token.current, level!, position!);

      const currentUrlWithoutQueryParams =
        window.location.origin + window.location.pathname;

      window.history.replaceState({}, "", currentUrlWithoutQueryParams);
    } else {
      const { token: localToken } = getLocalData();

      token.current = localToken!;
    }

    const userId = jwtDecode<{ memberId: string }>(token.current).memberId;

    return userId;
  }, [checkMemberKey, cleanLocalData, getLocalData, setLocalData]);

  return {
    getUserId,
  };
};

export default useUser;
