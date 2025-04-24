import { FaCity } from "react-icons/fa";
import TitleSection from "../../components/Elements/TitleSection";
import { CardDashboard } from "../../components/Fragments/Cards/CardLength";
import { getAllAdmin } from "../../services/superAdmin.service";
import { useEffect, useState } from "react";
import { getAllSite } from "../../services/site.service";
import { getAllValley } from "../../services/valley.service";
import { getAllObject } from "../../services/object.service";
import { getAllCategory } from "../../services/category.service";
import { getAllArticles } from "../../services/article.service";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  const articlesPage = useSelector((state) => state.articles.pagination);
  const eventsPage = useSelector((state) => state.events.pagination);
  const megalithPage = useSelector((state) => state.megalith.pagination);

  const [dataPage, setDataPage] = useState({
    admin: 0,
    valley: 0,
    site: 0,
    object: 0,
    event: 0,
    article: 0,
    categories: 0,
  });

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

  // const fetchApiData = async () => {
  //   try {
  //     const site = await getAllSite();
  //     setSites(site?.pagination?.totalItems);

  //     const valley = await getAllValley();
  //     setValleys(valley?.pagination?.totalItems);

  //     const category = await getAllCategory();
  //     setCategories(category?.pagination?.totalItems);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchApiData();
  // }, []);

  return (
    <>
      <div>
        <TitleSection className={"mb-3"}>Dashboard</TitleSection>
        <TitleSection>
          Balai Pelestarian Kebudayaan Wilayah XVIII <br /> Sistem Informasi
          Megalit
        </TitleSection>
      </div>

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
    </>
  );
};
