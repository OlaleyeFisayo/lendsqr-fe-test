import "./index.scss";
import {useContext} from "react"
import logo from "../../../../assets/svg/logo.svg";
import search from "../../../../assets/svg/search.svg";
import bell from "../../../../assets/svg/notification-bell.svg";
import profileImg from "../../../../assets/images/profile.jpg";
import dropdown from "../../../../assets/svg/dropdown.svg";
import MobileNavBar from "../MobileNavBar";
import { AppContext } from "../../../../setup/context";

export default function Navbar() {
  const { toggleSideBar } = useContext(AppContext)

  return (
    <>
      <nav className="desktop-view">
        <div className="logo-container">
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
        <div className="hamburger" onClick={toggleSideBar}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav>

      <MobileNavBar />
    </>
  );
}
