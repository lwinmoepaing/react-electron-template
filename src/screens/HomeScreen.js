import React, { useEffect } from "react";
import UserHook from "../hooks/user/UserHook";
import Container from "../components/template/Container";
import UserTable from "../components/user/UserTable";
import UserAdvancedSearch from "../components/user/UserAdvancedSearch";

const HomeScreen = () => {
  const {
    fetchUser,
    pagination,
    userList,
    userListLoading,
    query,
    setQuery,
    // isUserFetchingError,
    // page,
  } = UserHook();

  const onChangePage = (event, value) => {
    fetchUser({ pageParam: value, queryParam: query });
  };

  const onSearchQuery = (query) => {
    setQuery(query);
    fetchUser({ pageParam: 1, queryParam: query });
  };

  useEffect(() => {
    // Initial Fetching All Users
    fetchUser({});
    return () => {};
  }, []);

  return (
    <Container>
      <UserAdvancedSearch onSearch={onSearchQuery} loading={userListLoading} />
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
