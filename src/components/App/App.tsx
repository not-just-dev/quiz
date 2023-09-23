import { useState, useRef, useEffect } from "react";
import useUser from "../../hooks/useUser/useUser";
import Layout from "../Layout/Layout";
import Game from "../Game/Game";
import useLocalStorage from "../../hooks/useLocalStorage/useLocalStorage";

const App = (): React.ReactElement => {
  const [isReady, setIsReady] = useState(false);

  const { getUserId } = useUser();
  const { getLocalData } = useLocalStorage();

  const userId = useRef("");
  const level = useRef("");
  const position = useRef("");

  useEffect(() => {
    (async () => {
      try {
        userId.current = await getUserId();
      } catch {
        userId.current = "";
      } finally {
        setIsReady(true);
      }
    })();
  }, [getUserId]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const { level: localLevel, position: localPosition } = getLocalData();
    level.current = localLevel!;
    position.current = localPosition!;
  }, [getLocalData, isReady]);

  if (!isReady) {
    return (
      <Layout>
        <span>Validando...</span>
      </Layout>
    );
  }

  if (!userId.current) {
    return (
      <Layout>
        <span>
          El link ha expirado o la autenticación ha fallado, genera un nuevo
          link.
        </span>
      </Layout>
    );
  }

  return (
    <Layout>
      <Game
        userId={userId.current}
        level={level.current}
        position={position.current}
      />
    </Layout>
  );
};

export default App;
