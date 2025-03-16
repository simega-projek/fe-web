import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import Loading from "../../../components/Elements/Loading/Loading";
import { Detail } from "../../../components/Fragments/Detail/Detail";
import { OtherPosts } from "../../../components/Fragments/Detail/OtherPosts";
import { getAllEvent, getOneEvent } from "../../../services/event.service";
import { toView } from "../../../utils/toView";
import HTMLReactParser from "html-react-parser/lib/index";

export default function KegiatanDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [otherEvents, setOtherEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const LIMIT_OTHER_EVENT = 5;
  // const queryParams = new URLSearchParams(location.search);
  // const pages = queryParams.get("pages");
  // const totalPages = +pages + 1;

  const pagesEvent = useSelector((state) => state.pages.page);
  const { totalPages } = pagesEvent;

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getOneEvent(id);

      const randomPage = generateRandomNumber(1, totalPages + 1);
      // console.log(randomPage);
      let other = await getAllEvent(LIMIT_OTHER_EVENT, "", randomPage);

      setEvent(res.data);

      setOtherEvents(other);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(event);
  useEffect(() => {
    fetchData();
    toView("top");
  }, [id]);

  return (
    <>
      <div className="mb-10 mt-32 flex flex-col md:flex-row md:px-5">
        <div className="mb-10 px-5 md:w-8/12">
          {isLoading ? (
            <Loading />
          ) : (
            Object.keys(event).length > 0 && (
              <Detail
                linkEvent={event?.registration_link}
                date={event?.start_date}
                title={event?.title}
                img={event?.image}
                desc={event?.description}
                publish={event?.status}
              />
            )
          )}
          <hr />
        </div>

        <div className="flex w-full flex-col gap-3 break-words px-5 md:w-4/12">
          <p className="mt-0.5 text-lg font-medium text-gray-900">
            Kegiatan Lainnya
          </p>
          {otherEvents?.data?.map((o) => (
            <OtherPosts
              key={o?.ID}
              title={o?.title}
              desc={o?.description}
              to={`/kegiatan/${o?.ID}/${o?.title}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
