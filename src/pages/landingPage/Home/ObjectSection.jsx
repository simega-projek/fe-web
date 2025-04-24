import Aos from "aos";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonLink from "../../../components/Elements/Buttons/ButtonLink";
import TitleSection from "../../../components/Elements/TitleSection";
import { getAllObject } from "../../../services/object.service";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataMegalith,
  setPageMegalith,
} from "../../../redux/slices/megalithSlice";

export const ObjectSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  // redux
  const megalithData = useSelector((state) => state.megalith.data);
  const megalithPage = useSelector((state) => state.megalith.pagination);
  const dispatch = useDispatch();

  console.log(megalithPage);

  useEffect(() => {
    Aos.init({
      duration: 700,
      once: false,
    });
  }, []);
  const fetchDataApi = async () => {
    setIsLoading(true);
    try {
      const objects = await getAllObject(4, "", 1, "", "", "", "public");
      // setDataObjects(objects.data);
      dispatch(setDataMegalith(objects?.data));
      dispatch(setPageMegalith(objects?.pagination));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(dataObjects);

  useEffect(() => {
    fetchDataApi();
  }, []);

  return (
    <section
      id="situs"
      className="bg-tan bg-[url('/images/bg1.png')] bg-cover bg-fixed bg-no-repeat py-20 md:px-5"
    >
      <span className="flex items-center gap-5 px-10" data-aos="fade-up">
        <span className="h-px flex-1 bg-white"></span>
        <TitleSection className="text-white">Situs</TitleSection>
        <span className="h-px flex-1 bg-white"></span>
      </span>

      <div className="mb-5 px-10 text-justify text-base text-white md:text-center md:text-xl lg:text-2xl">
        Situs objek peninggalan megalitikum di Sulawesi Tengah merupakan salah
        satu warisan budaya yang kaya, mencerminkan sejarah panjang peradaban
        manusia di wilayah ini. Keberadaan situs ini memberikan wawasan yang
        berharga tentang tradisi, kepercayaan, dan kehidupan masyarakat
        prasejarah di Sulawesi Tengah, serta pentingnya pelestarian warisan
        budaya untuk generasi mendatang.
      </div>

      <div
        data-aos="fade-up"
        className="mx-auto grid w-full grid-cols-1 gap-5 px-10 md:grid-cols-2 md:gap-x-5 md:gap-y-10"
      >
        {isLoading ? (
          <SkletonCardObjectHome />
        ) : (
          megalithData
            ?.slice(0, window.innerWidth < 640 ? 2 : 4)
            ?.map((obj) => (
              <CardObjectHome
                key={obj?.ID}
                title={obj?.nama_objek}
                img={obj?.gambar}
                category={obj?.category?.category}
                to={`/objek/${obj?.ID}/${obj?.nama_objek}`}
              />
            ))
        )}
      </div>

      <div className="mt-10 flex w-full justify-center px-10">
        <ButtonLink
          to={`/persebaran`}
          className={`w-full rounded-none border-[3px] border-primary text-base font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-white md:w-1/2 md:text-lg lg:w-fit`}
        >
          Persebaran Megalitikum
        </ButtonLink>
      </div>
    </section>
  );
};

const CardObjectHome = ({ title, category, img, to }) => {
  return (
    <Link to={to} className="block">
      <img
        alt=""
        src={img}
        className="group h-56 w-full object-cover shadow-lg hover:shadow-2xl sm:h-64 lg:h-72"
      />

      <div className="flex items-center gap-4 text-white group-hover:bg-black group-hover:shadow-2xl sm:mt-4 sm:justify-center">
        <strong className="w-1/2 truncate text-center text-base font-medium capitalize md:text-xl">
          {title}
        </strong>

        <span className="hidden h-px w-8 bg-primary sm:block"></span>

        <p className="mt-0.5 w-1/2 truncate text-center text-base capitalize sm:mt-0 md:text-xl">
          {category}
        </p>
      </div>
    </Link>
  );
};

const SkletonCardObjectHome = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="group h-56 w-full bg-white/40 object-cover shadow-lg sm:h-64 lg:h-72" />

          <div className="mt-4 flex items-center gap-4 text-white sm:justify-center">
            <p className="h-5 w-1/3 truncate rounded-full bg-white/40 text-center text-base font-medium capitalize md:text-xl"></p>
            <p className="h-5 w-1/3 truncate rounded-full bg-white/40 text-center text-base font-medium capitalize md:text-xl"></p>
          </div>
        </div>
      ))}
    </>
  );
};
