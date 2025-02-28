const formattedDate = (isoDate) => {
  const date = new Date(isoDate); // Ubah string ISO menjadi objek Date
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default formattedDate;
