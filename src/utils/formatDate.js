import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

export const formatDate = (dateString) => {
  const cleanDateString = dateString.replace(" -08:00", "Z");
  const date = parseISO(cleanDateString);
  return format(date, "dd MMMM yyyy", { locale: id });
};
