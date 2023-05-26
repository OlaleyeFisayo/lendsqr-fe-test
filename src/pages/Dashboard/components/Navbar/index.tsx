import "./index.scss";
import logo from "../../../../assets/svg/logo.svg";
import search from "../../../../assets/svg/search.svg";
import bell from "../../../../assets/svg/notification-bell.svg";
import profileImg from "../../../../assets/images/profile.jpg";
import dropdown from "../../../../assets/svg/dropdown.svg";

export default function Navbar() {
  return (
    <nav>
      <div className="img-container">
        <img src={logo} alt="logo" />
      </div>
      <div className="search">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for anything"
        />
        <div className="search_button">
          <img src={search} alt="search icon" />
        </div>
      </div>
      <div className="details">
        <p>Docs</p>
        <img src={bell} alt="notification bell" />
        <div className="user-details">
          <div className="user-img">
            <img src={profileImg} alt="user image" />
          </div>
          <p className="username">Fisayo</p>
          <img src={dropdown} alt="" />
        </div>
      </div>
    </nav>
  );
}
