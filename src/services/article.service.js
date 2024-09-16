import axios from "axios";
import { fetchDataApi } from "./service";

export const getAllArticles = async (content = 100, search = "") => {
  try {
    return await fetchDataApi(
      "GET",
      `articles?content=${content}&search=${search}`,
    );
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
    throw err;
  }
};

export const getOneArticle = async (id) => {
  try {
    return await fetchDataApi("GET", `articles/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const createArticle = async (formData) => {
  try {
    return await fetchDataApi("POST", "articles", formData);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const updateArticle = async (id, formData) => {
  try {
    return await fetchDataApi("PUT", `articles/${id}`, formData);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const deleteArticle = async (id) => {
  try {
    return await fetchDataApi("DELETE", `articles/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const getTechCrunch = async () => {
  try {
    const res = await axios.get(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8fc2a96eb918480cb4cbcc92aeaa5620`,
    );
    return res.data.articles;
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};
