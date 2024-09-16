import { fetchDataApi } from "./service";

export const getAllObject = async (content = 100, search = "") => {
  try {
    return await fetchDataApi(
      "GET",
      `object?content=${content}&search=${search}`,
    );
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
    throw err;
  }
};

export const getOneObject = async (id) => {
  try {
    return await fetchDataApi("GET", `object/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const createObject = async (formData) => {
  try {
    return await fetchDataApi("POST", "object", formData);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const updateObject = async (id, formData) => {
  try {
    return await fetchDataApi("PUT", `object/${id}`, formData);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const deleteObject = async (id) => {
  try {
    return await fetchDataApi("DELETE", `object/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};
