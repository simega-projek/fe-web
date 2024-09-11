import { Outlet, useNavigate } from "react-router-dom";
import { Asidebars } from "../Fragments/Sidebar/Asidebar";
import { Content } from "../Fragments/Sidebar/Content";
import Header from "../Fragments/Sidebar/Header";
import { useLogin } from "../../useHooks/useLogin";
import { useEffect, useState } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useLogin(); // Invoke useLogin to handle authentication

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null; // Optionally render a loading spinner or nothing while redirecting
  }
  return (
    <div>
      <Header />
      <Asidebars />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
};

export default AdminLayout;
