import { RouterProvider } from "react-router-dom";
import { router } from "./setup/routes/Index";
import { ContextProvider } from "./setup/app-context-manager";
import "./App.scss";

function App() {
  return <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>;
}

export default App;
