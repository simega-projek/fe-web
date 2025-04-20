import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Detail } from "../../../components/Fragments/Detail/Detail";
import { SkletonDetailPage } from "../../../components/Fragments/Skleton/SkletonDetailPage";
import { getOneEvent } from "../../../services/event.service";
import { toView } from "../../../utils/toView";

export default function DetailEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const fetchObject = async () => {
    setIsLoading(true);
    try {
      const objects = await getOneEvent(id);

      setEvent(objects.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchObject();
    toView("top");
  }, [id]);

  console.log(event);

  return (
    <>
      <div className="mb-10 flex flex-col md:flex-row md:px-5">
        <div className="w-full">
          {isLoading ? (
            <SkletonDetailPage />
          ) : (
            Object.keys(event).length > 0 && (
              <Detail
                date={event?.CreatedAt}
                title={event?.title}
                img={event?.image}
                desc={event?.description}
                status={event?.status}
                linkEvent={event?.registration_link}
                detailList={true}
                start_date={event?.start_date}
                end_date={event?.end_date}
                classImage={"w-2/3"}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}
