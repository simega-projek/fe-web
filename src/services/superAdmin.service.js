import { fetchDataApi } from "./service";

export const getAllAdmin = async (content = 100, search = "") => {
  try {
    return await fetchDataApi(
      "GET",
      `auth/users?content=${content}&search=${search}`,
    );
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const getOneAdmin = async (id) => {
  try {
    return await fetchDataApi("GET", `auth/users/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const createAdmin = async (formData) => {
  try {
    return await fetchDataApi("POST", "auth/register", formData);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
    console.log(err.message);
  }
};

export const resetPassword = async (id) => {
  try {
    return await fetchDataApi("PUT", `auth/users/reset-password/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const deleteAdmin = async (id) => {
  try {
    return await fetchDataApi("DELETE", `auth/users/${id}`);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};
