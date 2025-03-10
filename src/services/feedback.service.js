import axios from "axios";
import { fetchDataApi } from "./service";

export const getAllFeedback = async (
  content = 100,
  search = "",
  page = 1,
  date = "",
  month = "",
  year = "",
) => {
  try {
    return await fetchDataApi(
      "GET",
      `feedbacks?page=${page}&content=${content}&search=${search}&date=${date}&month=${month}&year=${year}`,
    );
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
    throw err;
  }
};

export const getOneFeedback = async (id) => {
  try {
    return await fetchDataApi("GET", `feedbacks/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const createFeedback = async (formData) => {
  try {
    return await fetchDataApi("POST", "feedbacks", formData);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const deleteFeedback = async (id) => {
  try {
    return await fetchDataApi("DELETE", `feedbacks/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};
