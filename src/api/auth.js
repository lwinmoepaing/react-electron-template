import axios from "axios";
// Auth Js
export const requestLogin = async (body) => {
  return axios.post("/users/login", body);
};
