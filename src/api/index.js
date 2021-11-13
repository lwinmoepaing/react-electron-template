import axios from "axios";
const API_URL =
  process.env.SERVER_NAME + ":" + process.env.SERVER_PORT ||
  "http://localhost:5050";

export default () => {
  const axiosOptions = {
    timeout: 40000,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  };

  axios.defaults.timeout = axiosOptions.timeout;
  axios.defaults.headers = {
    ...axios.defaults.headers,
    ...axiosOptions.headers,
  };
  axios.defaults.baseURL = API_URL;

  // axios.interceptors.request.use(
  //   (request) => {
  //     // Edit request config
  //     return request;
  //   },
  //   (error) => {
  //     console.log(error);
  //     return Promise.reject(error);
  //   }
  // );

  // axios.interceptors.response.use(
  //   (response) => {
  //     console.log(response);
  //     // Edit response config
  //     return response;
  //   },
  //   (error) => {
  //     console.log(error);
  //     return Promise.reject(error);
  //   }
  // );
};
