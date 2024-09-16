export const getSulawesiTengah = async () => {
  try {
    const response = await fetch(
      "https://www.emsifa.com/api-wilayah-indonesia/api/regencies/72.json",
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getSulawesiBarat = async () => {
  try {
    const response = await fetch(
      "https://www.emsifa.com/api-wilayah-indonesia/api/regencies/76.json",
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getKabupaten = async (id) => {
  try {
    const response = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`,
    );

    if (!response.ok) {
      console.log(`Error fetching kabupaten: ${response.status}`);
      return null; // Handle non-200 responses (e.g., 404 Not Found)
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error in getKabupaten:", err);
    return null;
  }
};

export const getKecamatan = async (id) => {
  try {
    const response = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`,
    );

    if (!response.ok) {
      console.log(`Error fetching kecamatan: ${response.status}`);
      return null; // Handle non-200 responses
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error in getKecamatan:", err);
    return null;
  }
};

export const getKelurahan = async (id) => {
  try {
    const response = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`,
    );

    if (!response.ok) {
      console.log(`Error fetching kelurahan: ${response.status}`);
      return null; // Handle non-200 responses
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error in getKelurahan:", err);
    return null;
  }
};
