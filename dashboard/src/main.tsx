import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./reduxState/store";
import ErrorBoundary from "./components/errorBoundary.tsx";
import { ErrorForEntirePage } from "./components/errorFallback.tsx";
import App from "./routes/controller.tsx";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary fallback={<ErrorForEntirePage />}>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ErrorBoundary>
);
