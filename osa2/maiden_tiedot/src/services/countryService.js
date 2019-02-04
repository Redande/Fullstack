import axios from "axios";
const countriesUrl = "https://restcountries.eu/rest/v2";

const getAll = () => {
  const request = axios.get(`${countriesUrl}/all`);
  return request.then(response => response.data);
};

export default { getAll };
