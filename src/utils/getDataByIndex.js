export const getDataByIndex = (data, index) => {
  let splitData = data.split(",");
  if (index >= 0 && index < splitData.length) {
    return splitData[index];
  } else {
    return "Index out of range";
  }
};
