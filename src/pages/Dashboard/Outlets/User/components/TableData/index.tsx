import more from "../../../../../../assets/svg/more.svg";
import userCheck from "../../../../../../assets/svg/user-check2.svg";
import userTime from "../../../../../../assets/svg/user-time2.svg";
import view from "../../../../../../assets/svg/view.svg";
import { useState } from "react";
import "./index.scss";
import formatDate from "../../../../../../common/functions/formatDate";
import formatPhoneNumber from "../../../../../../common/functions/formatPhoneNumber";
import getUserStatus from "../../../../../../common/functions/getUserStatus";
import { Link } from "react-router-dom";

interface propTypes {
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  id: string;
  lastActiveDate: string;
}

export default function TableData({
  orgName,
  userName,
  email,
  phoneNumber,
  createdAt,
  id,
  lastActiveDate,
}: propTypes) {
  const [moreButton, setMoreButton] = useState(false);
  function showMore() {
    setMoreButton(true);
  }
  function hideMore() {
    setMoreButton(false);
  }

  return (
    <tr className="data">
      <td>{orgName}</td>
      <td>{userName}</td>
      <td>{email}</td>
      <td>{formatPhoneNumber(phoneNumber)}</td>
      <td>{formatDate(createdAt)}</td>
      <td>
        <p className={`${getUserStatus(lastActiveDate)}`}>
          {getUserStatus(lastActiveDate)}
        </p>
      </td>
      <td onClick={showMore}>
        <img src={more} alt="more button" />
      </td>

      {moreButton && (
        <td className="more">
          <p onClick={hideMore}>
            <img src={view} alt="view" />
            <Link to={`${id}`}>View Details</Link>
          </p>
          <p onClick={hideMore}>
            <img src={userTime} alt="user times" />
            Blacklist User
          </p>
          <p onClick={hideMore}>
            <img src={userCheck} alt="user check" />
            Activate user
          </p>
        </td>
      )}
    </tr>
  );
}
