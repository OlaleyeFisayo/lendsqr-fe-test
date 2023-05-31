import "./index.scss";
import { useContext } from "react";
import search from "../../../../assets/svg/search.svg";
import bell from "../../../../assets/svg/notification-bell.svg";
import profileImg from "../../../../assets/images/profile.jpg";
import dropdown from "../../../../assets/svg/dropdown.svg";
import { AppContext } from "../../../../setup/context";
import MobileSideBar from "./component/MobileSidebar";

export default function MobileNavBar() {
  const { toggleMobileSideBar, toggleSideBar } = useContext(AppContext);
  return (
    <nav className={toggleMobileSideBar ? "mobile-view show" : "mobile-view"}>
      <div className="x-container" onClick={toggleSideBar}>
        <div className="x-line"></div>
        <div className="x-line"></div>
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
        <p className="docs">Docs</p>
        <img src={bell} alt="notification bell" />
        <div className="user-details">
          <div className="user-img">
            <img src={profileImg} alt="user image" />
          </div>
          <p className="username">Fisayo</p>
          <img src={dropdown} alt="dropdown" />
        </div>
      </div>
      <MobileSideBar />
    </nav>
  );
}
