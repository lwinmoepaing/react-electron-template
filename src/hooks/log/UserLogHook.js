import { useCallback, useState } from "react";
import { fetchUserLogsRequest } from "../../api/log";
import { arrayConcatToString, delay } from "../../utils/helper";

function UserHook() {
  // Get User List Stage
  const [userLogsLoading, setUserLogsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({});
  const [pagination, setPagination] = useState(null);
  const [userLogs, setUserLogs] = useState([]);
  // Error Handling
  const [isUserLogFetchingError, setIsUserLogFetchingError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUserLogs = useCallback(
    async ({ queryParam = null, pageParam = null }) => {
      if (userLogsLoading) return;
      setUserLogsLoading(true);
      setIsUserLogFetchingError(false);
      await delay();
      try {
        const response = await fetchUserLogsRequest({
          query: queryParam,
          page: pageParam,
        });
        const users = response.data.data;

        setPagination(response.data.pagination);
        setUserLogs(users);
        setUserLogsLoading(false);
      } catch (err) {
        console.log(err);
        setUserLogsLoading(false);
        setIsUserLogFetchingError(true);
        if (
          err.response &&
          err.response.status >= 400 &&
          err.response.status <= 500
        ) {
          if (err.response.data.message) {
            setErrorMessage(arrayConcatToString(err.response.data.message));
          } else if (err.response.data.data.length) {
            setErrorMessage(
              arrayConcatToString(
                err.response.data.data.map((item) => item.message)
              )
            );
          }
        } else if (err.request) {
          // The request was made but no response was received
          setErrorMessage("Connection Timeout (plz restart app)");
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessage(
            "Something went wrong " + err.message + " (plz restart app)"
          );
        }
      }
    },
    [userLogsLoading]
  );

  return {
    pagination,
    userLogs,
    userLogsLoading,
    query,
    isUserLogFetchingError,
    errorMessage,
    page,
    setPage,
    setQuery,
    fetchUserLogs,
  };
}

export default UserHook;
