import axios from "axios";

const makeRequest = () => {
  return axios.create({
    // baseURL: `http://localhost:8000/api`
    baseURL: `http://guoli.com.au/beautifulfruit/public/api`
    // baseURL: `http://localhost/groupon_api/public/api`
  });
};

const request = makeRequest();

export default request;
