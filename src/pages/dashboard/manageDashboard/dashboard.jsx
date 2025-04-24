import TitleSection from "../../../components/Elements/TitleSection";
import { TabItem, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { AmountDash } from "./AmountDash";
import { VissionDash } from "./VissionDash";
import { StructureDash } from "./StructureDash";
import { TaskFuncDash } from "./TaskFuncDash";

export const Dashboard = () => {
  return (
    <>
      <div>
        <TitleSection>
          Balai Pelestarian Kebudayaan Wilayah XVIII <br /> Sistem Informasi
          Megalit
        </TitleSection>

        <Tabs className="mt-3" aria-label="Tabs with icons" variant="underline">
          <TabItem active title="Dashboard" icon={HiUserCircle}>
            <AmountDash />
          </TabItem>

          <TabItem title="Visi Misi" icon={MdDashboard}>
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
