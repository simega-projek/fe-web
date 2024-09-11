import { fetchDataApi } from "./service";

export const getProfile = async () => {
  try {
    return await fetchDataApi("GET", "auth/profile");
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
    throw err;
  }
};

export const updateProfile = async (formData) => {
  try {
    return await fetchDataApi("POST", `auth/update-profile`, formData);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};

export const changePassword = async (formData) => {
  try {
    return await fetchDataApi("POST", `auth/change-password`, formData);
  } catch (err) {
    return { error: true, message: err.message, statusCode: err.statusCode };
  }
};
