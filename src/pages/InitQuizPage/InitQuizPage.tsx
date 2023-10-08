import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser/useUser";
import useQueryParams from "../../hooks/useQueryParams/useQueryParams";

const InitQuizPage = (): React.ReactElement => {
  const { getUserId } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { key, memberId } = useQueryParams();

  useEffect(() => {
    (async () => {
      await getUserId(memberId!, key!);

      navigate(`/quiz${location.search}`);
    })();
  }, [getUserId, key, location.search, memberId, navigate]);

  return <></>;
};

export default InitQuizPage;
