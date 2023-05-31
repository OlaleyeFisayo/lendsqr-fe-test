import { createContext, useState } from "react";

interface AppContextType {
  toggleButton: boolean;
  showPassword(): void;
  handleSubmit(e: React.FormEvent): void;
  toggleSideBar(): void;
  toggleMobileSideBar: boolean;
  itemsPerPage: FormValues;
  currentPage: number;
  changeItems(event: React.ChangeEvent<HTMLSelectElement>): void;
  changeCurrentPage(event: React.MouseEvent<HTMLLIElement>): void;
}

interface FormValues {
  items: number;
}

const AppContext = createContext({} as AppContextType);

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [toggleButton, setToggleButton] = useState(false);
  const [toggleMobileSideBar, setToggleMobileSideBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState<FormValues>({
    items: 10,
  });
  function showPassword() {
    setToggleButton(!toggleButton);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }
  function toggleSideBar() {
    setToggleMobileSideBar(!toggleMobileSideBar);
  }
  function changeItems(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setitemsPerPage((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setCurrentPage(1)
  }
  function changeCurrentPage(event: React.MouseEvent<HTMLLIElement>) {
    setCurrentPage(parseInt(event.currentTarget.id));
  }

  const store = {
    toggleButton,
    showPassword,
    handleSubmit,
    toggleSideBar,
    toggleMobileSideBar,
    currentPage,
    itemsPerPage,
    changeItems,
    changeCurrentPage,
  };
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export { AppContext, ContextProvider };
export type { AppContextType };
