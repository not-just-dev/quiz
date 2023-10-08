import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useCallback, useRef } from "react";
import useApi from "../useApi/useApi";
import useLocalStorage from "../useLocalStorage/useLocalStorage";
import useGameStore from "../../store";

const useUser = () => {
  const { checkMemberKey } = useApi();
  const { setLocalData, getLocalData, cleanLocalData } = useLocalStorage();
  const { showLoading, hideLoading } = useGameStore((state) => state);
  const navigate = useNavigate();

  const token = useRef("");

  const getUserId = useCallback(
    async (memberId: string, key: string) => {
      if (memberId && key) {
        try {
          cleanLocalData();

          showLoading();

          token.current = await checkMemberKey(memberId, key);

          setLocalData(token.current);
        } catch (error) {
          hideLoading();
          navigate("/end?error=1");
        }
      } else {
        const { token: localToken } = getLocalData();

        token.current = localToken!;
      }

      hideLoading();
      const userId = jwtDecode<{ memberId: string }>(token.current).memberId;

      return userId;
    },
    [
      checkMemberKey,
      cleanLocalData,
      getLocalData,
      hideLoading,
      navigate,
      setLocalData,
      showLoading,
    ],
  );

  return {
    getUserId,
  };
};

export default useUser;
