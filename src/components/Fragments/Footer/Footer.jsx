import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <section id="footer" className="static block bottom-0 inset-x-0 bg-primary">
                <div className="flex flex-wrap  justify-center py-10 ">

                    <div className="w-full text-center md:w-1/2 lg:w-1/4 pb-10">
                        <img src="/public/icons/logo.svg" alt="" className="mx-auto" />
                        <h1 className="text-2xl font-bold text-white text-center lg:text-3xl">SIMEGA</h1>
                        <h2 className="text-white text-lg">Sistem Informasi <p>Megalitikum Sulawesi Tengah</p></h2>
                    </div>

                    <div className="w-full pb-10 lg:py-0 text-white  text-center md:w-1/2 lg:w-1/4">
                        <h1 className="text-2xl font-semibold mb-2">Kontak</h1>
                        <h3 className="text-lg">Palu, Sulawesi Tengah</h3>
                        <div className="flex items-center justify-center text-lg">
                            <span className="inline-block w-5 mr-1">
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-current"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                            </span>
                            +62 85218591585
                        </div>
                    </div>

                    <div className="w-full pb-10 lg:py-0 text-white md:w-1/2 text-center lg:w-1/4">
                        <h1 className="text-2xl font-semibold mb-2">Konten</h1>
                        <ul className="text-lg">
                            <li>
                                <a href="#about">Tentang</a>
                            </li>
                            <li >
                                <a href="#situs">Situs</a>
                            </li>
                            <li>
                                <a href="#kegiatan">Kegiatan</a>
                            </li>
                            <li>
                                <a href="#artikel">Artikel & Berita</a>
                            </li>
                        </ul>
                    </div>


                    <div className="w-full lg:w-1/4 md:w-1/2">
                        <div className="w-full text-center">
                            <h1 className="text-2xl font-semibold mb-2 text-white">Sosial Media</h1>
                        </div>
                        <div className="w-full flex justify-center gap-1">
                            <Link to={'https://www.instagram.com/simega2024?igsh=ZzZhbWd6dzA3aHhv'} target="blank" className="w-14 h-14 rounded-full group hover:bg-light flex justify-center items-center transition duration-300">
                                <svg className="w-10 h-10 text-white group-hover:text-primary  transition duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd" />
                                </svg>

                            </Link>
                            <Link to={'https://www.instagram.com/simega2024?igsh=ZzZhbWd6dzA3aHhv'} target="blank" className="w-14 h-14 rounded-full group hover:bg-light flex justify-center items-center transition duration-300">
                                <svg className="w-10 h-10 text-white group-hover:text-primary  transition duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" clip-rule="evenodd" />
                                </svg>


                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full text-center bg-dark">
                    <p className="text-sm text-light italic">copyright © simega 2024</p>
                </div>
            </section>
        </>
    );
}