import { useContext } from "react";
import { User } from "../../../../../../setup/api/getAllUser";
import "./index.scss";
import { AppContext } from "../../../../../../setup/context";

interface propType {
  users: User[];
}

export default function Pagination({ users }: propType) {
  const { itemsPerPage, changeItems, changeCurrentPage, currentPage } =
    useContext(AppContext);

  const pages = [];

  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage.items); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map((number) => {
    return (
      <li
        key={number}
        id={number.toString()}
        onClick={changeCurrentPage}
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
      <ul className="two">{renderPageNumbers}</ul>
    </div>
  );
}
