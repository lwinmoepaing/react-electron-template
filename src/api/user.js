import axios from "axios";
import { manageAuthorize } from "../utils/helper";

// User Api
export const fetchUserRequest = async ({ query, page }) => {
  const queryParams = {
    page,
  };

  if (query) {
    queryParams.query = query;
  }

  return axios.get("/users", { params: queryParams });
};

export const getUserByIdRequest = async (id) => {
  return axios.get(`/users/${id}`);
};

export const createUserRequest = async (body, token) => {
  return axios.post(`/users/register`, { ...body }, manageAuthorize(token));
};

export const updateUserByIdRequest = async (id, body, token) => {
  return axios.put(`/users/${id}`, { ...body }, manageAuthorize(token));
};

export const deleteUserByIdRequest = async (id, token) => {
  return axios.delete(`/users/${id}`, manageAuthorize(token));
};
