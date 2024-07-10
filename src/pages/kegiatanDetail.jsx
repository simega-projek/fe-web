import { useParams } from "react-router-dom";
import { getAllArticles, getArticle } from "../services/artikel.service";
import TitleSection from "../components/Elements/TitleSection";
import { useEffect, useState } from "react";
import Loading from "../components/Elements/Loading/Loading";
import { Detail } from "../components/Fragments/Detail/Detail";
import CardArtikel from "../components/Fragments/Cards/HomeCardArtikel";
import CardKegiatan from "../components/Fragments/Cards/HomeCardKegiatan";

export default function KegiatanDetail() {
    const { id } = useParams();
    const [artikel, setArtikel] = useState({});
    const [otherArtikel, setOtherArtikel] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const artikelData = await getArticle(id);
                setArtikel(artikelData);
                const otherArtikelData = await getAllArticles();
                setOtherArtikel(otherArtikelData);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);


    return (
        <>
            <div className="mt-[70px] container mx-auto p-5 flex flex-wrap justify-center items-center lg:justify-start lg:items-start">

                <div className="lg:w-8/12 ">
                    {loading ? (<Loading />) : (
                        Object.keys(artikel).length > 0 && (
                            <>
                                <Detail
                                    date="20,0202"
                                    title={artikel.title}
                                    img={artikel.image}
                                    desc={artikel.description} />
                            </>
                        )
                    )}
                </div>

                <div className="flex flex-col lg:w-4/12 my-20 lg:my-0 ">
                    <h3 className="text-xl font-bold my-5 mx-auto lg:mx-0">Kegiatan lainnya</h3>
                    <div className=" flex flex-wrap gap-3 w-full">
                        {otherArtikel.length > 0 && otherArtikel
                            .filter(item => item.id !== +id)
                            .slice(0, 3)
                            .map(item => (
                                <>
                                    <CardKegiatan to={`/kegiatan/${item.id}`} key={item.id} title={item.title} className="lg:hidden">
                                        {item.description}
                                    </CardKegiatan>

                                    <div className="hidden lg:block">
                                        <CardArtikel to={`/kegiatan/${item.id}`} key={item.id} title={item.title} >
                                            {item.description}
                                        </CardArtikel>
                                    </div>

                                </>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
