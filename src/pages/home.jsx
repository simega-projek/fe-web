
import ButtonLink from "../components/Elements/Buttons/ButtonLink";
import TitleSection from "../components/Elements/TitleSection";
import CardKegiatan from "../components/Fragments/Cards/HomeCardKegiatan";
import CardSitusHome from "../components/Fragments/Cards/HomeCardSitus";
import CardArtikel from "../components/Fragments/Cards/HomeCardArtikel";
import Footer from "../components/Fragments/Footer/Footer";

import artikelData from "../data/artikel.json";
import situsData from "../data/situs.json";
import kegiatanData from "../data/kegiatan.json";
import { HeroSection } from "../components/Fragments/Sections/Hero";

export default function HomePage() {
    return (
        <>
            <HeroSection>
                <p className="text-xl font-semibold m-auto md:text-2xl text-white max-w-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, harum?, sed.</p>
            </HeroSection>

            <section id="about" className="py-12 bg-[url('/images/bg2.svg')] bg-tan bg-no-repeat">
                <div className="container mx-auto w-11/12">
                    <div className="flex flex-wrap">
                        <div className="w-full px-6 lg:w-1/2">
                            <div className="flex mx-auto lg:w-5/6 md:w-5/6 ">
                                <h1 className="lg:pl-4 md:pl-10 block text-2xl font-black text-primary lg:text-4xl md:text-4xl text-left">
                                    Sulawesi Tengah <span className="block">Negeri 1000 Megalit</span>
                                </h1>
                            </div>

                            <div className="aspect-square shadow-2xl rounded-xl overflow-hidden mt-6 group md:w-3/4 mx-auto ">
                                <img src="/images/hero-img.png" className=" h-full w-full object-cover object-center group-hover:scale-110 transition-all duration-500" ></img>
                            </div>
                        </div>

                        <div className="w-full px-6 lg:w-1/2 md:w-3/4 mx-auto ">
                            <h2 className="w-1/2 block py-3 px-5 bg-dark text-light rounded-lg mt-6 font-bold text-lg lg:text-2xl lg:mt-[100px]">th. 2022</h2>

                            <p className="mt-4 text-lg font-medium text-justify md:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sed inventore quae unde, aspernatur accusantium iure temporibus veniam. Magnam, culpa? Cum exercitationem in nisi soluta sequi debitis natus mollitia qui? Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci voluptas eveniet consequatur laudantium delectus voluptatibus veritatis corporis, cum et? Tempore!</p>

                        </div>
                    </div>
                </div>
            </section>

            <section id="situs" className="py-20 bg-[url('/images/bg1.svg')] bg-tan">
                <div className="container mx-auto ">
                    <div className="flex flex-wrap ">
                        <div className="w-full md:mb-5 text-center">
                            <TitleSection>Situs</TitleSection>
                        </div >
                        <div className="flex flex-wrap gap-3 md:gap-5 lg:gap-0 lg:w-full w-10/12 mx-auto justify-center">
                            {situsData.slice(0, 3).map(situs => (
                                <CardSitusHome key={situs._id} title={situs.title} to={`/situs/${situs._id}`}>{situs.content}</CardSitusHome>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="kegiatan" className="py-20  bg-[url('/images/bg1.svg')] bg-tan">
                <div className="container mx-auto ">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full mb-10 text-center">
                            <TitleSection>Kegiatan</TitleSection>
                        </div >
                        <div className="flex flex-wrap w-8/12 mx-auto md:w-full lg:w-full gap-10 md:justify-center">
                            {kegiatanData.slice(0, 3).map(keg => (
                                <CardKegiatan key={keg._id} date={keg.date} title={keg.title} />
                            ))}


                        </div>
                        <div className="mt-8 w-8/12">
                            <ButtonLink to={`/kegiatan`} className={`mx-auto border-[3px] border-primary lg:w-6/12 hover:bg-primary hover:text-white transition-all duration-300`}>Lihat Semua Kegiatan</ButtonLink>
                        </div>
                    </div>
                </div>
            </section>

            <section id="artikel" className="py-20 bg-[url('/images/bg2.svg')] bg-no-repeat">
                <div className="container mx-auto">
                    <div className="flex flex-wrap ">
                        <div className="w-full mb-10  text-center lg:text-start lg:w-10/12 mx-auto">
                            <TitleSection>Artikel & Berita</TitleSection>
                        </div>

                        <div className="flex flex-wrap w-10/12 mx-auto gap-5 lg:w-full  justify-center">
                            {artikelData.slice(0, 4).map(artikel => (
                                <CardArtikel to={`/artikel/${artikel._id}`} image={artikel.image} key={artikel._id} title={artikel.title} date={artikel.date}>{artikel.content}</CardArtikel>
                            ))}

                        </div>
                        <div className="mt-8 w-10/12 mx-auto lg:w-8/12">
                            <ButtonLink to={`/artikel`} className={`mx-auto border-[3px] border-primary lg:w-6/12 hover:bg-primary hover:text-white transition-all duration-300`}>Lihat Semua Kegiatan</ButtonLink>
                        </div>
                    </div>
                </div>
            </section >


        </>
    );
}












