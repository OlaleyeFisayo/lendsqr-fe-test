import "./index.scss";
import ellipseOne from "../../../../assets/svg/ellipse1.svg";
import ellipseTwo from "../../../../assets/svg/ellipse2.svg";
import ellipseThree from "../../../../assets/svg/ellipse3.svg";
import ellipseFour from "../../../../assets/svg/ellipse4.svg";
import Table from "./components/Table";
import TableData from "./components/TableData";

export default function User() {
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

        <Table>
          <TableData />
          <TableData />
          <TableData />
          <TableData />
        </Table>
      </div>
    </section>
  );
}
