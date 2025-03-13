import { formatDate } from "../../../utils/formatDate";
import { ButtonControls } from "../../Elements/Buttons/ButtonControls";
import { MdDeleteForever } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa6";

export const CardFeedback = (props) => {
  const { name, address, message, date, onDelete, onView } = props;
  return (
    <div className="relative flex w-full flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="mx-3 mb-0 flex justify-between border-b border-slate-200 px-1 pb-2 pt-3">
        <div className="w-full truncate break-words text-sm font-medium text-slate-600">
          {name || "Nama Anaa"}
        </div>
        <div className="w-full truncate break-words text-end text-sm font-medium text-slate-600">
          {address || "085218591585"}
        </div>
      </div>

      <div className="flex flex-grow flex-col">
        <div className="flex-grow p-4">
          <p className="break-words font-light leading-normal text-slate-600">
            {message ||
              "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to Naviglio where you can enjoy the main night life in          Barcelona."}
          </p>
        </div>
        <div className="mx-3 flex justify-between border-t border-slate-200 px-1 pb-3 pt-2">
          <span className="text-sm font-medium text-slate-600">
            {formatDate(date) ?? "-"}
          </span>
          <div className="flex">
            <ButtonControls
              name={"Lihat"}
              icon={FaFileInvoice}
              onClick={onView}
            />
            <ButtonControls
              name={"Hapus"}
              icon={MdDeleteForever}
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
