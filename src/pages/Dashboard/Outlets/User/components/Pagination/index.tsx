import { useContext } from "react";
import { User } from "../../../../../../setup/api/getAllUser";
import "./index.scss";
import { AppContext } from "../../../../../../setup/context";
import usePagination from "../../../../../../setup/hooks/usePagination";

interface propType {
  users: User[];
}

export default function Pagination({ users }: propType) {
  const {
    itemsPerPage,
    changeItems,
    currentPage,
    increaseCurrentPageCount,
    decreaseCurrentPageCount,
  } = useContext(AppContext);

  const { totalPages, pages } = usePagination({
    currentPage: currentPage,
    itemsPerPage: itemsPerPage.items,
    totalItems: users.length,
    displayRange: 5,
  });

  const renderPageNumbers = pages.map((number, index) => {
    return (
      <li
        key={index}
        id={index.toString()}
        className={currentPage == number ? "active" : ""}
      >
        {number}
      </li>
    );
  });

  return (
    <div className="pagination">
      <div className="one">
        <p>Showing</p>
        <select name="items" value={itemsPerPage.items} onChange={changeItems}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
          <option value="80">80</option>
          <option value="90">90</option>
          <option value="100">100</option>
        </select>
        <p>out of {users.length}</p>
      </div>
      <ul className="two">
        <li
          className={currentPage === 1 ? "button disabled" : "button"}
          onClick={decreaseCurrentPageCount}
        >
          <button disabled={currentPage === 1}>&lt;</button>
        </li>
        {renderPageNumbers}
        <li
          className={currentPage === totalPages ? "button disabled" : "button"}
          onClick={increaseCurrentPageCount}
        >
          <button disabled={currentPage === totalPages}>&gt;</button>
        </li>
      </ul>
    </div>
  );
}
