import axios from "axios";
export const getAllArticles = async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getArticle = async (id, callback) => {
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
