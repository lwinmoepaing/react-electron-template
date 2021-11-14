import React, { useState, useEffect, useCallback } from "react";
import UserHook from "../hooks/user/UserHook";
import Container from "../components/template/Container";
import UserTable from "../components/user/UserTable";
import Button from "@mui/material/Button";

const HomeScreen = () => {
  const { fetchUser, userList, userListLoading, isUserFetchingError, page } =
    UserHook();

  useEffect(() => {
    fetchUser({});
    return () => {};
  }, []);

  useEffect(() => {
    console.log("UserList", userList);
  }, [userList]);

  return (
    <Container>
      <Button size="small" onClick={() => fetchUser({})} variant="contained">
        Refresh
      </Button>
      <UserTable userList={userList} loading={userListLoading} />
    </Container>
  );
};

export default HomeScreen;
