import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./components/Layouts/AdminLayout.jsx";
import MainLayout from "./components/Layouts/MainLayout.jsx";
import Media from "./components/Layouts/Media.jsx";
import "./index.css";
import ErrorPage from "./pages/404.jsx";
import { Dashboard } from "./pages/dashboard/dashboard.jsx";
import ActivityAdmin from "./pages/dashboard/manageActivities/activityAdmin.jsx";
import ArticleAdmin from "./pages/dashboard/manageArticles/articleAdmin.jsx";
import CategoryAdmin from "./pages/dashboard/manageCategory/categoryAdmin.jsx";
import { FeedbackAdmin } from "./pages/dashboard/manageFeedback/feedbackAdmin.jsx";
import LembahAdmin from "./pages/dashboard/manageLembah/lembahAdmin.jsx";
import ObjectPersebaran from "./pages/dashboard/manageObjek/objectPersebaran.jsx";
import ObjekAdmin from "./pages/dashboard/manageObjek/objekAdmin.jsx";
import { ProfileAdmin } from "./pages/dashboard/manageProfile/profileAdmin.jsx";
import PublicationAdmin from "./pages/dashboard/managePublication/publicationAdmin.jsx";
import SitusAdmin from "./pages/dashboard/manageSitus/situsAdmin.jsx";
import UserAdmin from "./pages/dashboard/manageUsers/userAdmin.jsx";
import ArtikelPage from "./pages/landingPage/Article/artikel.jsx";
import ArtikelDetail from "./pages/landingPage/Article/artikelDetail.jsx";
import KegiatanPage from "./pages/landingPage/Events/kegiatan.jsx";
import KegiatanDetail from "./pages/landingPage/Events/kegiatanDetail.jsx";
import FeedbackPage from "./pages/landingPage/feedback.jsx";
import HomePage from "./pages/landingPage/home.jsx";
import PersebaranPage from "./pages/landingPage/persebaran.jsx";
import SitusPage from "./pages/landingPage/situs.jsx";
import SitusDetail from "./pages/landingPage/situsDetail.jsx";
import Login from "./pages/login.jsx";
import store from "./redux/store.js";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
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
      {
        path: "/feedback",
        element: <FeedbackPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "admin/login",
    element: <Login />,
  },
  {
    path: "/admin/",
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
      {
        path: "persebaran-objek",
        element: <ObjectPersebaran />,
      },
      {
        path: "validasi-publikasi/",
        element: <PublicationAdmin />,
      },
      {
        path: "feedback-masyarakat/",
        element: <FeedbackAdmin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route} />
  </Provider>,
);
