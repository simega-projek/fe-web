import { TableCell, TableRow } from "flowbite-react";

export const SkletonTableData = ({ field = 1 }) => {
  return (
    <>
      {Array.from({ length: 3 }, (_, index) => (
        <TableRow key={index}>
          {Array.from({ length: field }, (_, index) => (
            <TableCell key={index} className="text-center">
              <div className="animate-pulse rounded-full bg-gray-300 py-1.5"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
