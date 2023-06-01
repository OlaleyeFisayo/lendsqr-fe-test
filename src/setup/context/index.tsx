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
  decreaseCurrentPageCount(): void;
  increaseCurrentPageCount(): void;
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
    setCurrentPage(1);
  }
  function decreaseCurrentPageCount() {
    setCurrentPage((prevValue) => prevValue - 1);
  }
  function increaseCurrentPageCount() {
    setCurrentPage((prevValue) => prevValue + 1);
  }

  const store = {
    toggleButton,
    showPassword,
    handleSubmit,
    toggleSideBar,
    toggleMobileSideBar,
    itemsPerPage,
    currentPage,
    changeItems,
    decreaseCurrentPageCount,
    increaseCurrentPageCount,
  };
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export { AppContext, ContextProvider };
export type { FormValues };
