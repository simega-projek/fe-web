import { TabItem, Tabs } from "flowbite-react";
import { FaCheckDouble } from "react-icons/fa";
import { HiAdjustments, HiClipboardList } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import TitleSection from "../../../components/Elements/TitleSection";
import { AmountDash } from "./AmountDash";
import { StructureDash } from "./StructureDash";
import { TaskFuncDash } from "./TaskFuncDash";
import { VissionDash } from "./VissionDash";

export const Dashboard = () => {
  return (
    <>
      <div>
        <TitleSection>
          Balai Pelestarian Kebudayaan Wilayah XVIII <br /> Sistem Informasi
          Megalit
        </TitleSection>

        <Tabs className="mt-3" aria-label="Tabs with icons" variant="underline">
          <TabItem active title="Dashboard" icon={MdDashboard}>
            <AmountDash />
          </TabItem>

          <TabItem title="Visi Misi" icon={FaCheckDouble}>
            <VissionDash />
          </TabItem>

          <TabItem title="Struktur Organisasi" icon={HiAdjustments}>
            <StructureDash />
          </TabItem>

          <TabItem title="Tugas dan Fungsi" icon={HiClipboardList}>
            <TaskFuncDash />
          </TabItem>
        </Tabs>
      </div>
    </>
  );
};
