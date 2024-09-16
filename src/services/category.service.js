import { fetchDataApi } from "./service";

export const getAllCategory = async (content = 200, search = "") => {
  try {
    return await fetchDataApi(
      "GET",
      `category?content=${content}&search=${search}`,
    );
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
    return await fetchDataApi("PUT", `category/${id}`, formData);
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
