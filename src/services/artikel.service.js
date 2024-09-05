import axios from "axios";
import { fetchData } from "./service";
export const getAllArticles = async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
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

export const getTechCrunch = async () => {
  try {
    const res = await axios.get(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8fc2a96eb918480cb4cbcc92aeaa5620`,
    );
    return res.data.articles;
  } catch (err) {
    console.log(err);
  }
};

export const fetchArticles = async () => {
  try {
    const res = await fetchData("get", "articles");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
