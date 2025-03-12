import React from "react";

export const DetailList = ({
  title,
  category,
  valley,
  site,
  lintang,
  bujur,
  status,
}) => {
  return (
    <div className="shadow-xs flow-root rounded-lg border border-gray-100 py-3">
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        {title && <List title={"Nama"}>{title}</List>}
        {category && <List title={"Kategori"}>{category}</List>}
        {valley && <List title={"Lembah"}>{valley}</List>}
        {site && <List title={"Situs"}>{site}</List>}
        {lintang && bujur && (
          <List title={"Titik Koordinat"}>
            {lintang}, {bujur}
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
