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
        path: "/artikel/:id",
        element: <ArtikelDetail />,
      },

      {
        path: "/kegiatan",
        element: <KegiatanPage />,
      },
      {
        path: "/kegiatan/:id",
        element: <KegiatanDetail />,
      },
      {
        path: "/persebaran",
        element: <PersebaranPage />,
      },
      {
        path: "/situs",
        element: <SitusPage />,
      },
      {
        path: "/situs/:id",
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
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={route} />,
);
