import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/Sidebar";
import "./index.scss"

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <div className="outlet">
                <SideBar />
                <Outlet />
            </div>
        </>
    )
}