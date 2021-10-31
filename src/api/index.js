import axios from "axios";

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
