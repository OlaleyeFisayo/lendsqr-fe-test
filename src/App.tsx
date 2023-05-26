import { RouterProvider } from "react-router-dom";
import { router } from "./setup/routes";
import { ContextProvider } from "./setup/app-context-manager";

function App() {
  return <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>;
}

export default App;
