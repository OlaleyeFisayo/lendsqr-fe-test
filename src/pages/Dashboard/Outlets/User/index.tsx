import "./index.scss";
import ellipseOne from "../../../../assets/svg/ellipse1.svg";
import ellipseTwo from "../../../../assets/svg/ellipse2.svg";
import ellipseThree from "../../../../assets/svg/ellipse3.svg";
import ellipseFour from "../../../../assets/svg/ellipse4.svg";
import Table from "./components/Table";
import TableData from "./components/TableData";
import { User } from "../../../../setup/api/getAllUser";
import Pagination from "./components/Pagination";
import { ReactNode, useContext } from "react";
import { AppContext } from "../../../../setup/context";
import useUserList from "../../../../setup/hooks/useUserList";

function renderUser(data: User[]): ReactNode {
  return data.map((item) => {
    return (
      <TableData
        key={item.id}
        orgName={item.orgName}
        userName={item.userName}
        email={item.email}
        phoneNumber={item.phoneNumber}
        createdAt={item.createdAt}
        id={item.id}
        lastActiveDate={item.lastActiveDate}
      />
    );
  });
}

export default function User() {
  const { users, error } = useUserList();
  const { currentPage, itemsPerPage } = useContext(AppContext);
  const indexOfLastItem = currentPage * itemsPerPage.items;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage.items;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  if (error) {
    return (
      <section className="user">
        <div className="user-content">
          <h1>There is an Error: {error.message}</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="user">
      <div className="user-content">
        <h1>Users</h1>
        <div className="user-container">
          <div className="users">
            <img src={ellipseOne} alt="user" />
            <h1>users</h1>
            <p>2,453</p>
          </div>
          <div className="users">
            <img src={ellipseTwo} alt="active users" />
            <h1>active users</h1>
            <p>2,453</p>
          </div>
          <div className="users">
            <img src={ellipseThree} alt="users with loans" />
            <h1>users with loans</h1>
            <p>12,453</p>
          </div>
          <div className="users">
            <img src={ellipseFour} alt="users with savings" />
            <h1>users with savings</h1>
            <p>102,453</p>
          </div>
        </div>

        <Table>{renderUser(currentItems)}</Table>

        <Pagination users={users} />
      </div>
    </section>
  );
}
