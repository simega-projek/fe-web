import { Outlet } from "react-router-dom";
import { NavbarDashboard } from "../Navbar";

export default function MainLayout() {
    return (
        <div className="">
            <NavbarDashboard />
            <Outlet />
        </div>
    );
}