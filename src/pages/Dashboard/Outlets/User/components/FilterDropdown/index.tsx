import "./index.scss";

export default function FilterDropDown() {
  return (
    <th className="filter">
      <div className="form">
        <p>Organization</p>
        <select name="organization" id="organization">
          <option value="">Select</option>
        </select>
        <p>Username</p>
        <input type="text" name="username" id="username" placeholder="User" />
        <p>Email</p>
        <input type="email" name="email" id="email" placeholder="Email" />
        <p>Date</p>
        <input type="date" name="date" id="date" placeholder="Date" />
        <p>Phone Number</p>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Phone Number"
        />
        <p>Status</p>
        <select name="status" id="status">
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
      </div>
    </th>
  );
}
