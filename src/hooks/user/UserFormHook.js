import { useCallback, useState } from "react";
import {
  updateUserByIdRequest,
  deleteUserByIdRequest,
  createUserRequest,
} from "../../api/user";
import { arrayConcatToString, delay } from "../../utils/helper";

function UserFormHook() {
  // Created User Form States
  const [createdUser, setCreatedUser] = useState(null);
  const [createdUserLoading, setCreatedUserLoading] = useState(false);
  const [isCreatedUserError, setIsCreatedUserError] = useState(false);
  const [errorMessageCreatedUser, setErrorMessageCreatedUser] = useState("");

  // Updateed User Form States
  const [updateUser, setUpdateUser] = useState(null);
  const [updateUserLoading, setUpdateUserLoading] = useState(false);
  const [isUpdateUserError, setIsUpdateUserError] = useState(false);
  const [errorMessageUpdateUser, setErrorMessageUpdateUser] = useState("");

  // Deleted User Form For States
  const [deleteUserLoading, setDeleteUserLoading] = useState(false);
  const [isDeleteUserError, setIsDeleteUserError] = useState(false);
  const [errorMessageDeletedUser, setErrorMessageDeletedUser] = useState("");

  const createUser = useCallback(
    async (body) => {
      if (createdUserLoading) {
        return;
      }
      setCreatedUserLoading(true);
      setIsCreatedUserError(false);
      await delay(0.4);
      try {
        const response = await createUserRequest(body);
        const users = response.data.data;
        setCreatedUser(users);
        setIsCreatedUserError(false);
        setCreatedUserLoading(false);
        return {
          isSuccess: true,
          user: users,
        };
      } catch (err) {
        setCreatedUserLoading(false);
        setIsCreatedUserError(true);
        if (
          err.response &&
          err.response.status >= 400 &&
          err.response.status <= 500
        ) {
          if (err.response.data.message) {
            setErrorMessageCreatedUser(
              arrayConcatToString(err.response.data.message)
            );
          } else if (err.response.data.data.length) {
            setErrorMessageCreatedUser(
              arrayConcatToString(
                err.response.data.data.map((item) => item.message)
              )
            );
          }
        } else if (err.request) {
          // The request was made but no response was received
          setErrorMessageCreatedUser("Connection Timeout (plz restart app)");
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessageCreatedUser(
            "Something went wrong " + err.message + " (plz restart app)"
          );
        }

        return {
          isSuccess: false,
          user: null,
        };
      }
    },
    [createdUserLoading]
  );

  const updateUserById = useCallback(
    async (id, body) => {
      if (updateUserLoading) {
        return;
      }
      setUpdateUserLoading(true);
      await delay(0.4);
      try {
        const response = await updateUserByIdRequest(id, body);
        const users = response.data.data;
        setUpdateUser(users);
        setIsUpdateUserError(false);
        setUpdateUserLoading(false);
        return {
          isSuccess: true,
          user: users,
        };
      } catch (err) {
        setUpdateUserLoading(false);
        setIsUpdateUserError(true);
        if (
          err.response &&
          err.response.status >= 400 &&
          err.response.status <= 500
        ) {
          if (err.response.data.message) {
            setErrorMessageUpdateUser(
              arrayConcatToString(err.response.data.message)
            );
          } else if (err.response.data.data.length) {
            setErrorMessageUpdateUser(
              arrayConcatToString(
                err.response.data.data.map((item) => item.message)
              )
            );
          }
        } else if (err.request) {
          // The request was made but no response was received
          setErrorMessageUpdateUser("Connection Timeout (plz restart app)");
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessageUpdateUser(
            "Something went wrong " + err.message + " (plz restart app)"
          );
        }

        return {
          isSuccess: false,
          user: null,
        };
      }
    },
    [updateUserLoading]
  );

  const deleteUserById = useCallback(
    async (id) => {
      if (deleteUserLoading) {
        return;
      }
      setDeleteUserLoading(true);
      setIsDeleteUserError(false);
      await delay(0.3);
      try {
        await deleteUserByIdRequest(id);
        setIsDeleteUserError(false);
        setDeleteUserLoading(false);
        return true;
      } catch (err) {
        setDeleteUserLoading(false);
        setIsDeleteUserError(true);
        if (
          err.response &&
          err.response.status >= 400 &&
          err.response.status <= 500
        ) {
          if (err.response.data.message) {
            setErrorMessageDeletedUser(
              arrayConcatToString(err.response.data.message)
            );
          } else if (err.response.data.data.length) {
            setErrorMessageDeletedUser(
              arrayConcatToString(
                err.response.data.data.map((item) => item.message)
              )
            );
          }
        } else if (err.request) {
          // The request was made but no response was received
          setErrorMessageDeletedUser("Connection Timeout (plz restart app)");
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessageDeletedUser(
            "Something went wrong " + err.message + " (plz restart app)"
          );
        }

        return false;
      }
    },
    [deleteUserLoading]
  );

  return {
    createdUser,
    createdUserLoading,
    isCreatedUserError,
    errorMessageCreatedUser,
    updateUser,
    updateUserLoading,
    isUpdateUserError,
    errorMessageUpdateUser,
    deleteUserLoading,
    isDeleteUserError,
    errorMessageDeletedUser,
    setIsUpdateUserError,
    setIsDeleteUserError,
    setIsCreatedUserError,
    createUser,
    updateUserById,
    deleteUserById,
  };
}

export default UserFormHook;
