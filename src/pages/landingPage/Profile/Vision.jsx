import React, { useEffect } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import { useLocation } from "react-router-dom";
import { toView } from "../../../utils/toView";

export const VisionPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    toView("top");
  }, [pathname]);
  return (
    <div className="min-h-screen bg-[url('/images/bg1.png')] py-20 pb-5 pt-28 text-2xl">
      <div className="flex w-full items-center gap-5 px-5 md:px-10">
        <TitleSection>Visi dan Misi</TitleSection>
        <span className="h-px flex-1 bg-primary"></span>
      </div>
    </div>
  );
};
