// import React from 'react'

// export const useGetObjects = () => {
//   const [dataObjects, setDataObjects] = useState([]);

//     const fetchDataApi = async () => {
//       setIsLoading(true);
//       try {
//         const objects = await getAllObject(4, "", 1, "", "", "", "public");
//         setDataObjects(objects.data);
//         // console.log(objects.data);

//         const events = await getAllEvent(4);
//         setDataEvents(events.data);
//         // console.log(events.data);

//         const articles = await getAllArticles(6);
//         setDataArticles(articles.data);
//         // console.log(articles.data);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     // console.log(dataObjects);

//     useEffect(() => {
//       fetchDataApi();
//       toView("top");
//     }, [pathname]);
// }
