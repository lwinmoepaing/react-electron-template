import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import UserLogHook from "../../hooks/log/UserLogHook";
import Container from "../../components/template/Container";
import UserLogTable from "../../components/log/UserLogTable";

const UserLogScreen = () => {
  const {
    pagination,
    userLogs,
    userLogsLoading,
    query,
    fetchUserLogs,
    // , pagination, userList, userListLoading, query
  } = UserLogHook();

  useEffect(() => {
    // Initial Fetching All Users
    fetchUserLogs({});
    return () => {};
  }, []);

  const onChangePage = (event, pageNo) => {
    fetchUserLogs({ pageParam: pageNo, queryParam: query });
  };

  return (
    <Container>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          mb: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ top: 2, position: "relative" }}>
          User Log List
        </Typography>
      </Box>

      <UserLogTable
        userList={userLogs}
        loading={userLogsLoading}
        pagination={pagination}
        onChangePage={onChangePage}
      />
    </Container>
  );
};

export default UserLogScreen;
