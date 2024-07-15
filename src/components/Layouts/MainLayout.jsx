import { Outlet } from "react-router-dom";
import { NavbarDashboard } from "../Fragments/Navbar";
import Footer from "../Fragments/Footer/Footer";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavbarDashboard />
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
