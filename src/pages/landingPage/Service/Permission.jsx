import React from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import Loading from "../../../components/Elements/Loading/Loading";

export const PermissionPage = () => {
  return (
    <div className="min-h-screen py-28">
      <div className="absolute inset-0 bg-[url('/images/bg2.svg')] bg-cover bg-no-repeat blur-md" />
      <div className="flex w-full items-center gap-5 px-5 md:px-10">
        <span className="h-px flex-1 bg-primary"></span>
        <TitleSection>Permohonan Izin Pemanfaatan Cagar Budaya</TitleSection>

        <Loading />
      </div>
    </div>
  );
};
