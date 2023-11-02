import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import flagsmith from "flagsmith";
import { FlagsmithProvider } from "flagsmith/react";
import App from "./components/App/App";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <FlagsmithProvider
    options={{
      environmentID: import.meta.env.VITE_APP_FLAGSMITH_ENVIRONMENT,
    }}
    flagsmith={flagsmith}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FlagsmithProvider>,
);
