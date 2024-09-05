import { Outlet } from "react-router-dom";
import { Asidebars } from "../Fragments/Sidebar/Asidebar";
import { Content } from "../Fragments/Sidebar/Content";
import Header from "../Fragments/Sidebar/Header";
import { useLogin } from "../../useHooks/useLogin";

export default function AdminLayout() {
  // const username = useLogin();
  return (
    <div>
      <Header />
      <Asidebars />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
}
