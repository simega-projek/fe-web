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
  const [admins, setAdmins] = useState(0);
  const [valleys, setValleys] = useState(0);
  const [sites, setSites] = useState(0);
  const [objects, setObjects] = useState(0);
  const [events, setEvents] = useState(0);
  const [articles, setArticles] = useState(0);
  const [categories, setCategories] = useState(0);

  const role = useSelector((state) => state.auth.userData);
  let roleAuth = role?.info?.role;
  let roleProfile = role?.data?.role;

  const fetchApiData = async () => {
    try {
      const admin = await getAllAdmin();
      setAdmins(admin?.pagination?.totalItems);
      // console.log(admins);
      const site = await getAllSite();
      setSites(site?.pagination?.totalItems);

      const valley = await getAllValley();
      setValleys(valley?.pagination?.totalItems);

      const objects = await getAllObject();
      setObjects(objects?.pagination?.totalItems);

      const article = await getAllArticles();
      setArticles(article?.pagination?.totalItems);

      const category = await getAllCategory();
      setCategories(category?.pagination?.totalItems);

      const events = await getAllObject();
      setEvents(events?.pagination?.totalItems);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);
  return (
    <>
      <TitleSection>Dashboard</TitleSection>
      <TitleSection>Bakultur - Sistem Informasi Megalit</TitleSection>
      <div className="-mx-2 my-5 flex flex-wrap">
        {roleAuth === roleProfile ||
          (roleProfile === "super-admin" && (
            <CardDashboard
              title={"Admin"}
              lots={admins}
              icon={FaCity}
              to={"/admin/kelola-user"}
            />
          ))}
        <CardDashboard
          title={"Lembah"}
          lots={valleys}
          icon={FaCity}
          to={`/admin/kelola-lembah`}
        />
        <CardDashboard
          title={"Situs"}
          lots={sites}
          icon={FaCity}
          to={`/admin/kelola-situs`}
        />
        <CardDashboard
          title={"Objek"}
          lots={objects}
          icon={FaCity}
          to={`/admin/kelola-objek`}
        />
        <CardDashboard
          title={"Jenis Objek"}
          lots={categories}
          icon={FaCity}
          to={`/admin/kelola-kategori`}
        />
        <CardDashboard
          title={"Kegiatan"}
          lots={events}
          icon={FaCity}
          to={`/admin/kelola-kegiatan`}
        />
        <CardDashboard
          title={"Artikel & Berita"}
          lots={articles}
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
