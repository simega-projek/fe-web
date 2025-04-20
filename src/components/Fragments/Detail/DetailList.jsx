import React from "react";
import formattedDate from "../../../utils/formattedDate";

export const DetailList = ({
  title,
  category,
  valley,
  site,
  lintang,
  bujur,
  link_event,
  status,
  file,
  start_date,
  end_date,
}) => {
  return (
    <div className="shadow-xs flow-root rounded-lg border border-gray-100 py-3">
      <dl className="-my-3 divide-y divide-gray-100 text-sm md:text-base">
        {title && <List title={"Nama"}>{title}</List>}
        {file && (
          <List title={"File"}>
            <a
              href={file}
              target="_blank"
              className="italic text-blue-500 underline"
            >
              Lihat Dokumen
            </a>
          </List>
        )}
        {start_date && (
          <List title={"Tanggal Kegiatan"}>
            {formattedDate(start_date)} - {formattedDate(end_date)}
          </List>
        )}
        {link_event && (
          <List title={"Link Kegiatan"}>
            <a
              href={link_event}
              target="_blank"
              className="italic text-blue-500 underline"
            >
              Lihat Link Kegiatan
            </a>
          </List>
        )}
        {category && <List title={"Kategori"}>{category}</List>}
        {valley && <List title={"Lembah"}>{valley}</List>}
        {site && <List title={"Situs"}>{site}</List>}
        {lintang && bujur && (
          <List title={"Titik Koordinat"}>
            {lintang}, {bujur} -{" "}
            <a
              href={`https://www.google.com/maps/@${lintang},${bujur},15z`}
              target="_blank"
              className="italic text-blue-500 underline"
            >
              (lihat google maps)
            </a>
          </List>
        )}
        {status && <List title={"Status"}>{status}</List>}
      </dl>
    </div>
  );
};

const List = ({ title, children }) => {
  return (
    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900">{title}</dt>
      <dd className="capitalize text-gray-700 sm:col-span-2">{children}</dd>
    </div>
  );
};
