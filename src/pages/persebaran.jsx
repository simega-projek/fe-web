import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import CardArtikel from "../components/Fragments/Cards/CardArtikel";
import CardSitus from "../components/Fragments/Cards/CardSitus";
import { getAllMaps } from '../services/maps.service';
import mapsData from "../data/map.json";
import { PopupMap } from '../components/Fragments/Cards/PopupMap';


export default function PersebaranPage() {
    const lokasi = [-0.9949962515054261, 121.40497407083464];
    const [maps, setMaps] = useState([]);

    useEffect(
        () => {
            const fecthData = async () => {
                try {
                    const getMaps = await getAllMaps();
                    setMaps(getMaps);
                    console.log(getMaps);
                } catch (err) {
                    console.log(err);
                } finally {
                    console.log('oke');
                }
            };
            fecthData();
        }, []
    );
    return (
        <>
            <div className="pb-20">
                <div className=" mx-auto">
                    <div className=" w-full flex flex-wrap justify-center">
                        <div className="w-full">
                            <MapContainer center={lokasi} zoom={7} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {maps.map(m => (

                                    <Marker position={[m.lintang, m.bujur]} key={m.id}>
                                        <Popup>
                                            <PopupMap id={m.id} titleObject={m.sekolah} titleSitus={m.propinsi} />
                                        </Popup>
                                    </Marker>

                                ))}

                            </MapContainer>
                        </div>
                        
                        <Search />


                        <div className="flex flex-wrap justify-center gap-5 w-11/12 md:w-full mt-10">
                            {maps.map(m => (
                                <CardSitus key={m.id} title={m.sekolah} desc={m.propinsi} to={`/situs/${m.id}`} />
                            ))}


                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

function Search() {
    const [dropdown, setDropdown] = useState('');
    useEffect(
        () => {
            
        },[]
    )

    return (
        <form className="max-w-lg mx-auto">
            <div className="flex">
                <label for="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                <button id="dropdown-button" data="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg></button>
                <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                        <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                        </li>
                        <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                        </li>
                        <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                        </li>
                        <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                        </li>
                    </ul>
                </div>
                <div className="relative w-full">
                    <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                    <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>

    );
}
