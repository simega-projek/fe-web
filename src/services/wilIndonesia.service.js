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
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getKecamatan = async (id) => {
  try {
    const response = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`,
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getKelurahan = async (id) => {
  try {
    const response = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`,
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
