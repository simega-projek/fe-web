export const API_BASE_URL = `http://34.101.227.131:8000`;

export const fetchData = async (method, url, data = null, params = null) => {
  const token = localStorage.getItem("token");

  const config = {
    method,
    url: API_BASE_URL + url,
    data,
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.res.data.message);
  }
};
