import * as React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { visuallyHidden } from "@mui/utils";
import BlueCatLoading from "../loading/BlueCatLoading";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Pagination from "@mui/material/Pagination";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const tableIconStyle = {
  width: 18,
  height: 18,
};

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "#Id",
  },
  {
    id: "profile_picture",
    numeric: false,
    disablePadding: false,
    label: "Avatar",
  },
  {
    id: "unique_name",
    numeric: false,
    disablePadding: false,
    label: "Unique Name",
  },
  {
    id: "user_name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "phone_no",
    numeric: true,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "role_id",
    numeric: false,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    isShowSelectBox,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {isShowSelectBox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function UserTable(props) {
  const {
    isShowSelectBox = false,
    userList = [],
    loading = false,
    pagination,
    onAction = () => {},
    onChangePage = () => {},
  } = props;

  const profile = useSelector(({ profile }) => profile);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size="small"
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
            borderSpacing: "0px 5px",
            borderCollapse: "separate",
          }}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={userList.length}
            isShowSelectBox={isShowSelectBox}
          />
          <TableBody>
            {!loading &&
              stableSort(userList, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {isShowSelectBox && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) => handleClick(event, row.id)}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                      )}
                      <TableCell id={labelId} scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>
                        <Avatar
                          alt="Remy Sharp"
                          sx={{ width: 24, height: 24 }}
                          src={`http:localhost:5050/api/images/${row.profile_picture}`}
                        />
                      </TableCell>
                      <TableCell>{row.unique_name}</TableCell>
                      <TableCell>{row.user_name}</TableCell>
                      <TableCell align="right">{row.phone_no}</TableCell>
                      <TableCell>{row.role.name}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          className="ActionPrimary"
                          size="small"
                          color="primary"
                          onClick={() => onAction({ item: row, type: "view" })}
                        >
                          <VisibilityIcon sx={tableIconStyle} />
                        </IconButton>
                        <IconButton
                          className="ActionWarning"
                          size="small"
                          color="warning"
                          onClick={() => onAction({ item: row, type: "edit" })}
                        >
                          <ModeEditOutlineOutlinedIcon sx={tableIconStyle} />
                        </IconButton>
                        <IconButton
                          disabled={row.id === profile.data.id}
                          className={
                            row.id === profile.data.id
                              ? "ActionDefault"
                              : "ActionDanger"
                          }
                          size="small"
                          color="error"
                          onClick={() =>
                            onAction({ item: row, type: "delete" })
                          }
                        >
                          <DeleteIcon sx={tableIconStyle} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            {loading && (
              <TableRow>
                <TableCell
                  colSpan={headCells.length}
                  sx={{ textAlign: "center" }}
                >
                  <div className="TableLoading">
                    <BlueCatLoading />
                  </div>
                  <Typography sx={{ marginBottom: 1, marginTop: 2 }}>
                    Loading ...
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!loading && pagination && (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Chip
              variant="outlined"
              color="primary"
              icon={<AccountCircleRoundedIcon />}
              label={"Total Users: " + pagination.totalCount}
            />
          </Grid>
          <Grid item xs={8}>
            <Pagination
              count={pagination.totalPage}
              page={pagination.currentPage}
              onChange={onChangePage}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
