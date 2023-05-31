import { RouterProvider } from "react-router-dom";
import { router } from "./setup/routes";
import { ContextProvider } from "./setup/context";

function App() {
  return <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>;
}

export default App;
