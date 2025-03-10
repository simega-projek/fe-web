import { fetchDataApi } from "./service";
export const getAllEvent = async (
  content,
  search = "",
  page = 1,
  status = "",
) => {
  try {
    return await fetchDataApi(
      "GET",
      `events?page=${page}&content=${content}&search=${search}&status=${status}`,
    );
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
    throw err;
  }
};

export const getOneEvent = async (id) => {
  try {
    return await fetchDataApi("GET", `events/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const createEvent = async (formData) => {
  try {
    return await fetchDataApi("POST", "events", formData);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const updateEvent = async (id, formData) => {
  try {
    return await fetchDataApi("PUT", `events/${id}`, formData);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const deleteEvent = async (id) => {
  try {
    return await fetchDataApi("DELETE", `events/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};
