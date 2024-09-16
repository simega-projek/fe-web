import { fetchDataApi } from "./service";

export const getAllValley = async (content = 100, search = "") => {
  try {
    return await fetchDataApi(
      "GET",
      `lembah?content=${content}&search=${search}`,
    );
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
    throw err;
  }
};

export const getOneValley = async (id) => {
  try {
    return await fetchDataApi("GET", `lembah/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const createValley = async (formData) => {
  try {
    return await fetchDataApi("POST", "lembah", formData);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const updateValley = async (id, formData) => {
  try {
    return await fetchDataApi("PUT", `lembah/${id}`, formData);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const deleteValley = async (id) => {
  try {
    return await fetchDataApi("DELETE", `lembah/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};
