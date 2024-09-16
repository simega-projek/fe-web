import { fetchDataApi } from "./service";
export const getAllEvent = async (content, search = "") => {
  try {
    return await fetchDataApi(
      "GET",
      `events?content=${content}&search=${search}`,
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
