import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useQueryParams = () => {
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);

  const memberId = queryParams.get("id");
  const key = queryParams.get("key");
  const level = queryParams.get("level");
  const position = queryParams.get("position");

  useEffect(() => {
    if (!memberId || !key || !level || !position) {
      navigate("/end?error=1");
    }
  }, [memberId, key, level, position, navigate]);

  return {
    memberId,
    key,
    level,
    position,
  };
};

export default useQueryParams;
