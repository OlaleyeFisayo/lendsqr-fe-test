import filterIcon from "../../../../../../assets/svg/filter.svg";
import "./index.scss";

export default function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="table">
      <table>
        <tr>
          <th>
            <p>
              Organization
              <img src={filterIcon} alt="Filter Icon" />
            </p>
          </th>
          <th>
            <p>
              username
              <img src={filterIcon} alt="Filter Icon" />
            </p>
          </th>
          <th>
            <p>
              email
              <img src={filterIcon} alt="Filter Icon" />
            </p>
          </th>
          <th>
            <p>
              phone number
              <img src={filterIcon} alt="Filter Icon" />
            </p>
          </th>
          <th>
            <p>
              date joined
              <img src={filterIcon} alt="Filter Icon" />
            </p>
          </th>
          <th>
            <p>
              status
              <img src={filterIcon} alt="Filter Icon" />
            </p>
          </th>
          <th></th>
        </tr>
        {children}
      </table>
    </div>
  );
}
