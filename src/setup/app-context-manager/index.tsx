import { createContext, useState } from "react";

interface AppContextType {
  toggleButton: boolean;
  handleClick(): void;
  handleSubmit(e: React.FormEvent): void;
}

const AppContext = createContext({} as AppContextType);

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [toggleButton, setToggleButton] = useState(false);
  function handleClick() {
    setToggleButton(!toggleButton);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  const store = {
    toggleButton,
    handleClick,
    handleSubmit,
  };
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export { AppContext, ContextProvider };
export type { AppContextType };
