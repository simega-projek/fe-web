import { Select } from "flowbite-react";

export const FilterPage = ({ onChange, value, className }) => {
  return (
    <Select className={`ml-2 ${className}`} onChange={onChange} value={value}>
      <option value={10}>10</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </Select>
  );
};
