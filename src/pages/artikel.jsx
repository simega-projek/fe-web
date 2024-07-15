import { useEffect, useState } from "react";
import Loading from "../components/Elements/Loading/Loading";
import TextBlink from "../components/Elements/TextBlink/TextBlink";
import { HeroSection } from "../components/Fragments/Sections/Hero";
import { getAllArticles } from "../services/artikel.service";
import CardArtikel from "../components/Fragments/Cards/CardArtikel";
import CardArtikelHome from "../components/Fragments/Cards/HomeCardArtikel";

export default function ArtikelPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        let fecthData = async () => {
            try {
                const dataArticle = await getAllArticles();
                setArticles(dataArticle);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fecthData();
    }, []);
    return (
        <>
            <HeroSection className="h-80 md:h-96">
                <div className="text-center text-white">
                    <h2 className="text-xl font-semibold md:text-2xl max-w-xl mb-5">Artikel & Berita</h2>
                    <TextBlink className={`text-base max-w-sm`}>Telaah Artikel menarik di Negeri 1000 Megalit Sulawesi Tengah</TextBlink>
                </div>
            </HeroSection>

            {
                loading ? (<Loading />) : (
                    <div className="my-12 flex flex-wrap px-10 gap-5 justify-center md:px-0 md:justify-evenly lg:justify-center">
                        {
                            articles.length > 0 && articles.map(article => (
                                <>
                                    <CardArtikel
                                        title={article.title}
                                        to={`/artikel/${article.id}`}

                                    />

                                </>
                            ))
                        }
                    </div>
                )
            }
        </>
    );
}



