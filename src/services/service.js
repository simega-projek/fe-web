import axios from "axios";

const baseUrl = `http://34.101.227.131:8000/`;

export const fetchDataApi = async (method, url, data = null, params = null) => {
  const token = localStorage.getItem("token");

  const config = {
    method,
    url: `${baseUrl}${url}`,
    headers:
      method !== "GET"
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    params,
    data,
  };

  try {
    const response = await axios(config);
    console.log(response.data);
    return response.data;
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      const statusCode = error.response.status; // Ambil status code
      throw { message: errorMessage, statusCode }; // Lempar pesan dan status code
    } else if (error.request) {
      throw { message: "No response received from server", statusCode: null };
    } else {
      throw { message: error.message, statusCode: null };
    }
  }
};
