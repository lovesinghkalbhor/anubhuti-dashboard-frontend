import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, BrowserRouter } from "react-router";

import { Provider } from "react-redux";
import store from "./reduxState/store";
import ErrorBoundary from "./components/errorBoundary.tsx";
import { ErrorForEntirePage } from "./components/errorFallback.tsx";
import App from "./routes/controller.tsx";

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV;

// Choose the appropriate router
const Router = isDevelopment ? BrowserRouter : HashRouter;

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary fallback={<ErrorForEntirePage />}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ErrorBoundary>
);
