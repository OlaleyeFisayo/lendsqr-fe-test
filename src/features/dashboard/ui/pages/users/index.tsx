import UserStats from "../../components/user-stats";
import UserTable from "../../components/user-table";
import "./users.scss";

export default function Users() {
  return (
    <section id="users-page">
      <h1>Users</h1>
      <UserStats />
      <UserTable />
    </section>
  );
}
