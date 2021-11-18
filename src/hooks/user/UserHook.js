import { useCallback, useState } from "react";
import { fetchUserRequest, getUserByIdRequest } from "../../api/user";
import { arrayConcatToString, delay } from "../../utils/helper";

function UserHook() {
  // Get User List Stage
  const [userListLoading, setUserListLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({});
  const [pagination, setPagination] = useState(null);
  const [userList, setUserList] = useState([]);
  // Error Handling
  const [isUserFetchingError, setIsUserFetchingError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Get User By Id States
  const [user, setUser] = useState(null);
  const [getUserByIdLoading, setGetUserByIdLoading] = useState(false);
  const [isUserByIdError, setIsUserByIdError] = useState(false);
  const [errorMessageGetUser, setErrorMessageGetUser] = useState("");

  const fetchUser = useCallback(
    async ({ queryParam = null, pageParam = null }) => {
      if (userListLoading) return;
      setUserListLoading(true);
      setIsUserFetchingError(false);
      setUser(null);
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

  const getUserById = useCallback(
    async (id) => {
      if (getUserByIdLoading) {
        return;
      }
      setGetUserByIdLoading(true);
      setIsUserByIdError(false);
      await delay(0.7);

      try {
        const response = await getUserByIdRequest(id);
        const users = response.data.data;
        setUser(users);
        setGetUserByIdLoading(false);
      } catch (err) {
        setGetUserByIdLoading(false);
        setIsUserByIdError(true);
        if (
          err.response &&
          err.response.status >= 400 &&
          err.response.status <= 500
        ) {
          if (err.response.data.message) {
            setErrorMessageGetUser(
              arrayConcatToString(err.response.data.message)
            );
          } else if (err.response.data.data.length) {
            setErrorMessageGetUser(
              arrayConcatToString(
                err.response.data.data.map((item) => item.message)
              )
            );
          }
        } else if (err.request) {
          // The request was made but no response was received
          setErrorMessageGetUser("Connection Timeout (plz restart app)");
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessageGetUser(
            "Something went wrong " + err.message + " (plz restart app)"
          );
        }
      }
    },
    [getUserByIdLoading]
  );

  const onUpdatedUser = useCallback(
    (user) => {
      const isExistUser = userList.some((u) => u.id === user?.id);
      if (isExistUser) {
        const getIndex = userList.findIndex((u) => u.id === user?.id);
        let modifiedUsers = [...userList];
        modifiedUsers[getIndex] = user;
        setUserList([...modifiedUsers]);
      }
    },
    [setUserList, userList]
  );

  const onDeletedUser = useCallback(
    (user) => {
      const isExistUser = userList.some((u) => u.id === user?.id);
      if (isExistUser) {
        setUserList(userList.filter((u) => u.id !== user.id));
      }
    },
    [setUserList, userList]
  );

  return {
    pagination,
    userList,
    userListLoading,
    query,
    isUserFetchingError,
    errorMessage,
    page,
    user,
    getUserByIdLoading,
    isUserByIdError,
    errorMessageGetUser,
    getUserById,
    onUpdatedUser,
    onDeletedUser,
    setPage,
    setQuery,
    fetchUser,
  };
}

export default UserHook;
