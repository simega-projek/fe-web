import axios from "axios";
export const getAllMaps = async () => {
  try {
    const res = await axios.get(
      "https://api-sekolah-indonesia.vercel.app/sekolah?provinsi=180000&page=1&perPage=10",
    );
    return res.data.dataSekolah;
  } catch (err) {
    console.log(err);
  }
};

export const getArticle = async (id) => {
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
