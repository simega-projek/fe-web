import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/404.jsx';
import ArtikelPage from './pages/artikel.jsx';
import ArtikelDetail from './pages/artikelDetail.jsx';
import HomePage from './pages/home.jsx';
import KegiatanPage from './pages/kegiatan.jsx';
import KegiatanDetail from './pages/kegiatanDetail.jsx';
import PersebaranPage from './pages/persebaran.jsx';
import SitusPage from './pages/situs,.jsx';
import SitusDetail from './pages/situsDetail.jsx';
import Media from './components/Layouts/Media.jsx';
import MainLayout from './components/Layouts/MainLayout.jsx';



const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/artikel",
        element: <ArtikelPage />
      },
      {
        path: "/artikel/:id",
        element: <ArtikelDetail />
      },

      {
        path: "/kegiatan",
        element: <KegiatanPage />
      },
      {
        path: "/kegiatan/:id",
        element: <KegiatanDetail />
      },
      {
        path: "/persebaran",
        element: <PersebaranPage />
      },
      {
        path: "/situs",
        element: <SitusPage />
      },
      {
        path: "/situs/:id",
        element: <SitusDetail />
      },
      {
        path: "/kegiatan/:id",
        element: <KegiatanDetail />
      },
      {
        path: "/media",
        element: <Media />
      },
    ]
  },



]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route} />

  </React.StrictMode>,
);
