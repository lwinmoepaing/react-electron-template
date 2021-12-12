import axios from "axios";

// User Api
export const fetchUserLogsRequest = async ({ query, page }) => {
  const queryParams = {
    page,
  };

  if (query) {
    queryParams.query = query;
  }

  return axios.get("/logs/user_log", { params: queryParams });
};
