// import React, { useState } from "react";
// import { getAllObject } from "../../services/object.service";

// export const useFetchMegalith = ({
//   content=1,
//   search,
//   page,
//   lembah,
//   site,
//   category,
//   publish,
// }) => {
//   const [dataObjects, setDataObjects] = useState([]);

//   const [isLoading, setIsLoading] = useState(false);
//   const fetchDataApi = async () => {
//     setIsLoading(true);
//     try {
//       const res = await getAllObject(
//         content,
//         search,
//         page,
//         lembah,
//         site,
//         category,
//         publish,
//       );
//       setDataObjects(res);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDataApi();
//   }, [content, search, page, lembah, site, category, publish]);

//   return { dataObjects, isLoading };
// };
