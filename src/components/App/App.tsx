import { useState, useRef, useEffect } from "react";
import useUser from "../../hooks/useUser/useUser";
import Layout from "../Layout/Layout";

const App = (): React.ReactElement => {
  const [isReady, setIsReady] = useState(false);

  const { getToken } = useUser();

  const token = useRef("");

  useEffect(() => {
    (async () => {
      try {
        token.current = await getToken();
      } catch {
        token.current = "";
      } finally {
        setIsReady(true);
      }
    })();
  }, [getToken]);

  if (!isReady) {
    return (
      <Layout>
        <span>Validando...</span>
      </Layout>
    );
  }

  if (!token.current) {
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
      <span>Holi</span>
    </Layout>
  );
};

export default App;
