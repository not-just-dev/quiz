import axios from "axios";
import { useEffect, useState } from "react";

const App = (): React.ReactElement => {
  const [isLogged, setIsLogged] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const memberId = queryParams.get("id");
    const key = queryParams.get("key");

    if (memberId || key) {
      localStorage.removeItem("token");

      (async () => {
        const { data } = await axios.get<{ token: string }>(
          `${
            import.meta.env.VITE_APP_API_URL
          }members/check-key/${memberId}/${key}`,
        );

        localStorage.setItem("token", data.token);

        const currentUrl = window.location.origin + window.location.pathname;
        window.location.replace(currentUrl);
      })();
    }

    const token = localStorage.getItem("token");

    if (token) {
      setIsLogged(true);
    }

    setTimeout(() => setIsReady(true), 500);
  }, []);

  return isReady ? (
    isLogged ? (
      <p>Autenticado</p>
    ) : (
      <p>
        El link ha expirado o la autenticación ha fallado, genera un nuevo link.
      </p>
    )
  ) : (
    <p>Autenticando...</p>
  );
};

export default App;
