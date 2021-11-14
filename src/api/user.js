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
