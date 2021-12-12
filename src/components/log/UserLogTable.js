import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import BlueCatLoading from "../loading/BlueCatLoading";
import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import UpdatedLogDialog from "./UpdatedLogDialog";

const tableIconStyle = {
  width: 18,
  height: 18,
};

const USER_LOG_TYPE = {
  UPDATE_USER: "UPDATE_USER",
  CREATE_USER: "CREATE_USER",
  DELETE_USER: "DELETE_USER",
};

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
    id: "user_name",
    numeric: false,
    disablePadding: false,
    label: "Action User",
  },
  {
    id: "message",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "object_name",
    numeric: false,
    disablePadding: false,
    label: "Object User",
  },
  {
    id: "action_type",
    numeric: false,
    disablePadding: false,
    label: "Action Type",
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
    onChangePage = () => {},
  } = props;

  // const profile = useSelector(({ profile }) => profile);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const [openUpdatedDialog, setOpenUpdatedDialog] = React.useState(false);
  const [updatedFieldData, setUpdatedFieldData] = React.useState([]);

  const onShowUpdatedField = React.useCallback((row) => {
    try {
      const getJson = JSON.parse(row.attachment);
      setOpenUpdatedDialog(true);
      setUpdatedFieldData(getJson.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

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
                (row, _index) => {
                  const isItemSelected = isSelected(row.id);
                  return (
                    <TableRow
                      hover
                      index={_index}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell>{row.user_name}</TableCell>
                      <TableCell>
                        {row.message}
                        {row.action_type === USER_LOG_TYPE.UPDATE_USER && (
                          <Button
                            className="ActionPrimary"
                            size="small"
                            color="primary"
                            onClick={() => onShowUpdatedField(row)}
                            sx={{ ml: 1, borderRadius: 5, px: 1.2 }}
                            startIcon={<ReceiptLongIcon sx={tableIconStyle} />}
                          >
                            Show Log
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        {row.object_name} [#{row.object_id}]
                      </TableCell>
                      <TableCell>{row.action_type}</TableCell>
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

      {/* Pagination Start */}
      {!loading && pagination && (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Chip
              variant="outlined"
              color="primary"
              icon={<ReceiptLongIcon />}
              label={"Total User Logs: " + pagination.totalCount}
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
      {/* Pagination Finished */}

      {/* Updated Dialog */}
      <UpdatedLogDialog
        open={openUpdatedDialog}
        handleClose={() => setOpenUpdatedDialog(false)}
        updatedFieldData={updatedFieldData}
      />
      {/* Updated Dialog Finished*/}
    </Box>
  );
}
