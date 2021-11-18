import React, { useEffect, useState } from "react";
import UserHook from "../hooks/user/UserHook";
import Container from "../components/template/Container";
import UserTable from "../components/user/UserTable";
import UserAdvancedSearch from "../components/user/UserAdvancedSearch";
import UserDialog from "../components/user/UserDialog";

const HomeScreen = () => {
  const {
    fetchUser,
    pagination,
    userList,
    userListLoading,
    query,
    setQuery,
    onUpdatedUser,
    onDeletedUser,
  } = UserHook();

  useEffect(() => {
    // Initial Fetching All Users
    fetchUser({});
    return () => {};
  }, []);

  const [dialogState, setDialogState] = useState({
    open: false,
    methodType: "view",
    item: {},
  });

  const onChangePage = (event, pageNo) => {
    fetchUser({ pageParam: pageNo, queryParam: query });
  };

  const onSearchQuery = (query) => {
    setQuery(query);
    fetchUser({ pageParam: 1, queryParam: query });
  };

  const onAction = ({ item, type }) => {
    setDialogState({
      methodType: type,
      open: true,
      item,
    });
  };

  const onClose = () => {
    setDialogState({
      ...dialogState,
      open: false,
    });
  };

  return (
    <Container>
      <UserAdvancedSearch onSearch={onSearchQuery} loading={userListLoading} />
      <UserTable
        userList={userList}
        loading={userListLoading}
        pagination={pagination}
        onChangePage={onChangePage}
        onAction={onAction}
      />
      <UserDialog
        open={dialogState.open}
        onClose={onClose}
        methodType={dialogState.methodType}
        item={dialogState.item}
        onUpdatedUser={onUpdatedUser}
        onDeletedUser={onDeletedUser}
        onCreatedUser={() => fetchUser({})}
      />
    </Container>
  );
};

export default HomeScreen;
