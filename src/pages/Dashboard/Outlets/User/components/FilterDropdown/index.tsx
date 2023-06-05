import { AppContext } from "../../../../../../setup/context";
import { useContext } from "react";
import "./index.scss";

export default function FilterDropDown() {
  const { handleFilterForm } = useContext(AppContext);
  return (
    <th className="filter">
      <td className="form">
        <p>Organization</p>
        <select
          name="organization"
          id="organization"
          onChange={handleFilterForm}
        >
          <option value="">Select</option>
        </select>
        <p>Username</p>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="User"
          onChange={handleFilterForm}
        />
        <p>Email</p>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleFilterForm}
        />
        <p>Date</p>
        <input
          type="date"
          name="date"
          id="date"
          placeholder="Date"
          onChange={handleFilterForm}
        />
        <p>Phone Number</p>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Phone Number"
          onChange={handleFilterForm}
        />
        <p>Status</p>
        <select name="status" id="status" onChange={handleFilterForm}>
          <option value="">Select</option>
          <option value="not active">Not active</option>
          <option value="active">Active</option>
          <option value="blacklisted">Blacklisted</option>
          <option value="pending">Pending</option>
        </select>
        <div className="button-section">
          <button>Reset</button>
          <button>Filter</button>
        </div>
      </td>
    </th>
  );
}
