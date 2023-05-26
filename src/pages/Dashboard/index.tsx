import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/Sidebar";

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