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
  filterDropdown: boolean;
  toogleFilterDropdown(): void;
  filterFormData: FilterFormValues;
  handleFilterForm(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void;
}

interface FormValues {
  items: number;
}

interface FilterFormValues {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

const AppContext = createContext({} as AppContextType);

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [toggleButton, setToggleButton] = useState(false);
  const [toggleMobileSideBar, setToggleMobileSideBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [filterFormData, setFilterFormData] = useState<FilterFormValues>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });
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
  function toogleFilterDropdown() {
    setFilterDropdown(!filterDropdown);
  }
  const handleFilterForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFilterFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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
    filterDropdown,
    toogleFilterDropdown,
    filterFormData,
    handleFilterForm
  };
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export { AppContext, ContextProvider };
export type { FormValues };
