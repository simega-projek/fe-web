import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/404.jsx";
import HomePage from "./pages/landingPage/home.jsx";
import ArtikelPage from "./pages/landingPage/artikel.jsx";
import ArtikelDetail from "./pages/landingPage/artikelDetail.jsx";
import KegiatanPage from "./pages/landingPage/kegiatan.jsx";
import KegiatanDetail from "./pages/landingPage/kegiatanDetail.jsx";
import PersebaranPage from "./pages/landingPage/persebaran.jsx";
import SitusPage from "./pages/landingPage/situs.jsx";
import SitusDetail from "./pages/landingPage/situsDetail.jsx";
import Media from "./components/Layouts/Media.jsx";
import MainLayout from "./components/Layouts/MainLayout.jsx";
import Login from "./pages/login.jsx";
import AdminLayout from "./components/Layouts/AdminLayout.jsx";
import { Dashboard } from "./pages/dashboard/dashboard.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ObjekAdmin from "./pages/dashboard/manageObjek/objekAdmin.jsx";
import ArticleAdmin from "./pages/dashboard/manageArticles/articleAdmin.jsx";
import ActivityAdmin from "./pages/dashboard/manageActivities/activityAdmin.jsx";
import UserAdmin from "./pages/dashboard/manageUsers/userAdmin.jsx";
import { ProfileAdmin } from "./pages/dashboard/manageProfile/profileAdmin.jsx";
import CategoryAdmin from "./pages/dashboard/manageCategory/categoryAdmin.jsx";
import LembahAdmin from "./pages/dashboard/manageLembah/lembahAdmin.jsx";
import SitusAdmin from "./pages/dashboard/manageSitus/situsAdmin.jsx";
import PersebaranPage2 from "./pages/landingPage/persebaran2.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/artikel",
        element: <ArtikelPage />,
      },
      {
        path: "/artikel/:id/:slug",
        element: <ArtikelDetail />,
      },

      {
        path: "/kegiatan",
        element: <KegiatanPage />,
      },
      {
        path: "/kegiatan/:id/:slug",
        element: <KegiatanDetail />,
      },
      {
        path: "/persebaran",
        element: <PersebaranPage />,
      },
      {
        path: "/objek",
        element: <SitusPage />,
      },
      {
        path: "/objek/:id/:slug",
        element: <SitusDetail />,
      },
      {
        path: "/kegiatan/:id",
        element: <KegiatanDetail />,
      },
      {
        path: "/media",
        element: <Media />,
      },
    ],
  },
  {
    path: "admin/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "kelola-objek",
        element: <ObjekAdmin />,
      },
      {
        path: "kelola-kategori",
        element: <CategoryAdmin />,
      },
      {
        path: "kelola-situs",
        element: <SitusAdmin />,
      },
      {
        path: "kelola-lembah",
        element: <LembahAdmin />,
      },
      {
        path: "kelola-artikel",
        element: <ArticleAdmin />,
      },
      {
        path: "kelola-kegiatan",
        element: <ActivityAdmin />,
      },
      {
        path: "kelola-user",
        element: <UserAdmin />,
      },
      {
        path: "profil",
        element: <ProfileAdmin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route} />,
  </Provider>,
);
