import { FaCity } from "react-icons/fa";
import TitleSection from "../../components/Elements/TitleSection";
import { CardDashboard } from "../../components/Fragments/Cards/CardLength";

export const Dashboard = () => {
  return (
    <>
      <TitleSection>Dashboard</TitleSection>
      <TitleSection>Sistem Informasi Megalit</TitleSection>
      <div className="-mx-2 my-5 flex flex-wrap">
        <CardDashboard title={"Admin"} lots={500} icon={FaCity} />
        <CardDashboard title={"Lembah"} lots={500} icon={FaCity} />
        <CardDashboard title={"Situs"} lots={500} icon={FaCity} />
        <CardDashboard title={"Objek"} lots={500} icon={FaCity} />
        <CardDashboard title={"Jenis Objek"} lots={500} icon={FaCity} />
        <CardDashboard title={"Kegiatan"} lots={500} icon={FaCity} />
        <CardDashboard title={"Artikel & Berita"} lots={500} icon={FaCity} />
      </div>
    </>
  );
};
