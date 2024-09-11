import { fetchDataApi } from "./service";

export const getAllCategory = async () => {
  try {
    return await fetchDataApi("GET", "category");
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
    throw err;
  }
};

export const getOneCategory = async (id) => {
  try {
    return await fetchDataApi("GET", `category/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const createCategory = async (formData) => {
  try {
    return await fetchDataApi("POST", "category", formData);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const updateCategory = async (id, formData) => {
  try {
    return await fetchDataApi("POST", `category/${id}`, formData);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const deleteCategory = async (id) => {
  try {
    return await fetchDataApi("DELETE", `category/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};
