import React from "react";

import { TabItem, Tabs } from "flowbite-react";
import { BsEnvelopeOpenFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import TitleSection from "../../../components/Elements/TitleSection";
import { ComplaintAdmin } from "./ComplaintAdmin";
import { FeedbackAdmin } from "./FeedbackAdmin";
import PermissionAdmin from "./PermissionAdmin";

import { BiSolidMessageDetail } from "react-icons/bi";
import { MdFeedback } from "react-icons/md";

// const FeedbackAdmin = lazy(() => import("./FeedbackAdmin"));

export const ServiceFeedback = () => {
  return (
    <div>
      <TitleSection className="my-5 flex underline">
        <FaPeopleGroup /> Layanan Masyarakat
      </TitleSection>
      <Tabs
        className="mt-3"
        aria-label="Tabs with underline"
        variant="fullWidth"
      >
        <TabItem active title="Umpan Balik" icon={BiSolidMessageDetail}>
          <FeedbackAdmin />
        </TabItem>

        <TabItem title="Pengaduan Masyarakat" icon={MdFeedback}>
          <ComplaintAdmin />
        </TabItem>

        <TabItem title="Permohonan Izin" icon={BsEnvelopeOpenFill}>
          <PermissionAdmin />
        </TabItem>
      </Tabs>
    </div>
  );
};
