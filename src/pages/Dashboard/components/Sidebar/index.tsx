import "./index.scss";
import briefcase from "../../../../assets/svg/briefcase.svg";
import dropdown from "../../../../assets/svg/dropdown.svg";
import home from "../../../../assets/svg/home.svg";
import user from "../../../../assets/svg/user.svg";
import userTwo from "../../../../assets/svg/userTwo.svg";
import sack from "../../../../assets/svg/sack.svg";
import handshake from "../../../../assets/svg/handshake.svg";
import piggyBank from "../../../../assets/svg/piggy-bank.svg";
import saving from "../../../../assets/svg/savings.svg";
import userCheck from "../../../../assets/svg/user-check.svg";
import userTimes from "../../../../assets/svg/user-times.svg";
import bank from "../../../../assets/svg/bank.svg";
import coin from "../../../../assets/svg/coin.svg";
import transfer from "../../../../assets/svg/transfer.svg";
import galaxy from "../../../../assets/svg/galaxy.svg";
import userCog from "../../../../assets/svg/user-cog.svg";
import scroll from "../../../../assets/svg/scroll.svg";
import chart from "../../../../assets/svg/chart.svg";
import slider from "../../../../assets/svg/slider.svg";
import badge from "../../../../assets/svg/badge.svg";
import clipboard from "../../../../assets/svg/clipboard.svg";
import signOut from "../../../../assets/svg/sign-out.svg";
import tire from "../../../../assets/svg/tire.svg";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="switch-org">
        <img src={briefcase} alt="briefcase" />
        <p>Switch Organization</p>
        <img src={dropdown} alt="dropdown" />
      </div>

      <NavLink to="">
        <img src={home} alt="home" />
        <p>Dashboard</p>
      </NavLink>

      <ul>
        <p>Customer</p>
        <li>
          <NavLink to="user">
            <img src={user} alt="user" />
            <p>Users</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={userTwo} alt="user two" />
            <p>Guarantors</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={sack} alt="sack" />
            <p>Loans</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={handshake} alt="handshake" />
            <p>Decision Models</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={piggyBank} alt="piggyb bank" />
            <p>Savings</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={saving} alt="savings" />
            <p>Loan Requests</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={userCheck} alt=" user check" />
            <p>Whitelist</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={userTimes} alt="user times" />
            <p>Karma</p>
          </NavLink>
        </li>
      </ul>

      <ul>
        <p>Businesses</p>
        <li>
          <NavLink to="">
            <img src={briefcase} alt="briefcase" />
            <p>Organization</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={saving} alt="savings" />
            <p>Loan Products</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={bank} alt="bank" />
            <p>Saving Products</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={coin} alt="coin" />
            <p>Fees and Charges</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={transfer} alt="transfer" />
            <p>Transaction</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={galaxy} alt="galaxy" />
            <p>Services</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={userCog} alt="user cog" />
            <p>Service Account</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={scroll} alt="scroll" />
            <p>Settlements</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={chart} alt="chart" />
            <p>Reports</p>
          </NavLink>
        </li>
      </ul>

      <ul>
        <p>Settings</p>
        <li>
          <NavLink to="">
            <img src={slider} alt="slider" />
            <p>Organization</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={badge} alt="badge" />
            <p>Loan Products</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={clipboard} alt="clipboard" />
            <p>Saving Products</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="">
            <img src={tire} alt="tire" />
            <p>Fees and Charges</p>
          </NavLink>
        </li>
      </ul>

      <div className="divider"></div>

      <div className="logout">
        <img src={signOut} alt="sign out" />
        <p>Logout</p>
      </div>
    </div>
  );
}
