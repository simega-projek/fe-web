import React, { useEffect, useState } from "react";
import { FaCity } from "react-icons/fa";
import { CardDashboard } from "../../../components/Fragments/Cards/CardLength";
import { useSelector } from "react-redux";

export const AmountDash = () => {
  const [dataPage, setDataPage] = useState({
    admin: 0,
    valley: 0,
    site: 0,
    object: 0,
    event: 0,
    article: 0,
    categories: 0,
  });

  const articlesPage = useSelector((state) => state.articles.pagination);
  const eventsPage = useSelector((state) => state.events.pagination);
  const megalithPage = useSelector((state) => state.megalith.pagination);

  const role = useSelector((state) => state.auth.userData);
  let roleAuth = role?.info?.role;
  let roleProfile = role?.data?.role;

  useEffect(() => {
    setDataPage((prev) => ({
      ...prev,

      object: megalithPage?.totalItems,
      event: eventsPage?.totalItems,
      article: articlesPage?.totalItems,
    }));
  }, [
    megalithPage?.totalItems,
    eventsPage?.totalItems,
    articlesPage?.totalItems,
  ]);
  return (
    <div className="-mx-2 my-5 flex flex-wrap">
      <CardDashboard
        title={"Lembah"}
        lots={dataPage.valley}
        icon={FaCity}
        to={`/admin/kelola-lembah`}
      />
      <CardDashboard
        title={"Situs"}
        lots={dataPage.site}
        icon={FaCity}
        to={`/admin/kelola-situs`}
      />
      <CardDashboard
        title={"Objek"}
        lots={dataPage.object}
        icon={FaCity}
        to={`/admin/kelola-objek`}
      />
      <CardDashboard
        title={"Jenis Objek"}
        lots={dataPage.categories}
        icon={FaCity}
        to={`/admin/kelola-kategori`}
      />
      <CardDashboard
        title={"Kegiatan"}
        lots={dataPage.event}
        icon={FaCity}
        to={`/admin/kelola-kegiatan`}
      />
      <CardDashboard
        title={"Artikel & Berita"}
        lots={dataPage.article}
        icon={FaCity}
        to={`/admin/kelola-artikel`}
      />
      {/* <CardDashboard
          title={"Umpan Balik Masyarakat"}
          lots={articles}
          icon={FaCity}
          to={`/admin/kelola-artikel`}
        /> */}
    </div>
  );
};
