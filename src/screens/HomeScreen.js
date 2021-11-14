import React, { useState, useEffect, useCallback } from "react";
import UserHook from "../hooks/user/UserHook";
import Container from "../components/template/Container";
import UserTable from "../components/user/UserTable";
import Button from "@mui/material/Button";

const HomeScreen = () => {
  const {
    fetchUser,
    pagination,
    userList,
    userListLoading,
    isUserFetchingError,
    page,
  } = UserHook();

  const onChangePage = (event, value) => {
    fetchUser({ pageParam: value });
  };

  useEffect(() => {
    // Initial Fetching All Users
    fetchUser({});
    return () => {};
  }, []);

  return (
    <Container>
      <UserTable
        userList={userList}
        loading={userListLoading}
        pagination={pagination}
        onChangePage={onChangePage}
      />
    </Container>
  );
};

export default HomeScreen;
