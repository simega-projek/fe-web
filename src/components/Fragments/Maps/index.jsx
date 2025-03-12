import React from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import { PopupMap } from "../Cards/PopupMap";

export const Maps = ({ dataObject, path }) => {
  const lokasi = [-0.9949962515054261, 121.40497407083464];

  return (
    <div className="w-full">
      <MapContainer center={lokasi} zoom={7} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Indonesia</a> peta'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {dataObject?.map((o) => (
          <Marker position={[o?.lintang, o?.bujur]} key={o?.ID}>
            <Popup>
              <PopupMap
                id={o?.ID}
                title={o?.nama_objek}
                img={o?.gambar}
                category={o?.category?.category}
                lintang={o?.lintang}
                bujur={o?.bujur}
                to={`${path}/${o?.ID}/${o?.nama_objek}`}
              />
            </Popup>
            <Tooltip className="capitalize" sticky>
              {o.nama_objek}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
