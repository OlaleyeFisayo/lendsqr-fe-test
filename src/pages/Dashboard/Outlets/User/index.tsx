import "./index.scss";
import ellipseOne from "../../../../assets/svg/ellipse1.svg";
import ellipseTwo from "../../../../assets/svg/ellipse2.svg";
import ellipseThree from "../../../../assets/svg/ellipse3.svg";
import ellipseFour from "../../../../assets/svg/ellipse4.svg";
import Table from "./components/Table";
import TableData from "./components/TableData";
import { User, getAllUser } from "../../../../setup/api/getAllUser";
import { useLoaderData } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader(): Promise<User[]> {
  const data = await getAllUser();
  return data;
}

export default function User() {
  const users = useLoaderData() as User[];

  const userList = users.map((data) => {
    return (
      <TableData
        key={data.id}
        orgName={data.orgName}
        userName={data.userName}
        email={data.email}
        phoneNumber={data.phoneNumber}
        createdAt={data.createdAt}
        id={data.id}
        lastActiveDate={data.lastActiveDate}
      />
    );
  });

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

        <Table>{userList}</Table>

        <div className="pagination">
          <div className="one">
            <p>Showing</p>
            <select name="limit" id="limit">
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
          <div className="two"></div>
        </div>
      </div>
    </section>
  );
}
