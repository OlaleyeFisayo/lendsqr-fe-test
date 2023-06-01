import { useContext } from "react";
import filterIcon from "../../../../../../assets/svg/filter.svg";
import FilterDropDown from "../FilterDropdown";
import "./index.scss";
import { AppContext } from "../../../../../../setup/context";

export default function Table({ children }: { children: React.ReactNode }) {
  const { filterDropdown, toogleFilterDropdown } = useContext(AppContext);

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>
              <p>
                Organization
                <img onClick={toogleFilterDropdown} src={filterIcon} alt="Filter Icon" />
              </p>
            </th>
            <th>
              <p>
                username
                <img onClick={toogleFilterDropdown} src={filterIcon} alt="Filter Icon" />
              </p>
            </th>
            <th>
              <p>
                email
                <img onClick={toogleFilterDropdown} src={filterIcon} alt="Filter Icon" />
              </p>
            </th>
            <th>
              <p>
                phone number
                <img onClick={toogleFilterDropdown} src={filterIcon} alt="Filter Icon" />
              </p>
            </th>
            <th>
              <p>
                date joined
                <img onClick={toogleFilterDropdown} src={filterIcon} alt="Filter Icon" />
              </p>
            </th>
            <th>
              <p>
                status
                <img onClick={toogleFilterDropdown} src={filterIcon} alt="Filter Icon" />
              </p>
            </th>
            <th></th>
            {filterDropdown && <FilterDropDown />}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
