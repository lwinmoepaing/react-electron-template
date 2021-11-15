import { useCallback, useState } from "react";
import { fetchUserRequest } from "../../api/user";
import { arrayConcatToString, delay } from "../../utils/helper";

function UserHook() {
  const [userListLoading, setUserListLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({});
  const [pagination, setPagination] = useState(null);
  const [userList, setUserList] = useState([]);
  // Error Handling
  const [isUserFetchingError, setIsUserFetchingError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUser = useCallback(
    async ({ queryParam = null, pageParam = null }) => {
      if (userListLoading) return;
      setUserListLoading(true);
      setIsUserFetchingError(false);
      await delay(1);
      try {
        const response = await fetchUserRequest({
          query: queryParam,
          page: pageParam,
        });
        const users = response.data.data;

        setPagination(response.data.pagination);
        setUserList(users);
        setUserListLoading(false);
      } catch (err) {
        console.log("Fetch User Request Error...");
        console.log(err);
        setUserListLoading(false);
        setIsUserFetchingError(true);
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
    [userListLoading]
  );

  return {
    pagination,
    userList,
    userListLoading,
    query,
    isUserFetchingError,
    errorMessage,
    page,
    setPage,
    setQuery,
    fetchUser,
  };
}

export default UserHook;
