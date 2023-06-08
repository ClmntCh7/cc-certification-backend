const filtrifyQueryParams = (queryParam) => {
  const entries = Object.entries(queryParam);
  const newArr = [];
  entries.map((elem, index) => {
    [...newArr];
    newArr.push(elem.join("="));
  });
  const filters = newArr.join("&");
  return filters + "&";
};

module.exports = filtrifyQueryParams;
