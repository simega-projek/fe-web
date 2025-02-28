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

  const fetchAdmin = async () => {
    try {
      const res = await getAllAdmin();
      setAdmins(res?.pagination?.totalItems);
      // console.log(admins);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSites = async () => {
    try {
      const res = await getAllSite();
      setSites(res?.pagination?.totalItems);
      // console.log(res?.pagination?.totalItems);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchValleys = async () => {
    try {
      const res = await getAllValley();
      setValleys(res?.pagination?.totalItems);
      // console.log(valleys);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchObjects = async () => {
    try {
      const res = await getAllObject();
      setObjects(res?.pagination?.totalItems);
      // console.log(objects);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCategory = async () => {
    try {
      const res = await getAllCategory();
      setCategories(res?.pagination?.totalItems);
      // console.log(categories);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchEvents = async () => {
    try {
      const res = await getAllObject();
      setEvents(res?.pagination?.totalItems);
      // console.log(events);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchArticles = async () => {
    try {
      const res = await getAllArticles();
      setArticles(res?.pagination?.totalItems);
      // console.log(articles);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAdmin();
    fetchSites();
    fetchValleys();
    fetchObjects();
    fetchCategory();
    fetchEvents();
    fetchArticles();
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
      </div>
    </>
  );
};
