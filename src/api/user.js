import axios from "axios";
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
  return axios.post(
    `/users/register`,
    {
      ...body,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateUserByIdRequest = async (id, body, token) => {
  return axios.put(
    `/users/${id}`,
    { ...body },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteUserByIdRequest = async (id) => {
  return axios.delete(`/users/${id}`);
};
