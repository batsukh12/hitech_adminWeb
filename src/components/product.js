import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import axios from "axios";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 200,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "count",
    label: "Stock",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "createdAt",
    label: "CreatedAt",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [fetchedData, setFetchedData] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = React.useCallback(async () => {
    try {
      const response = await axios.get("/api/user");
      console.log("response", response.data);
      setFetchedData(response.data.data);
    } catch (err) {
      console.error("error", err);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {}, [fetchedData]);

  return (
    <Box margin="4rem">
      <Box></Box>
      <Box>
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "4rem" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {fetchedData.map((item) => (
                  <TableRow key={item._id} align={item.align}>
                    <TableCell>{item.name} </TableCell>
                    <TableCell>{item.price} </TableCell>
                    <TableCell align="right">{item.description} </TableCell>
                    <TableCell align="right">{item.count} </TableCell>
                    <TableCell align="right">{item.createdAt} </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={1} // Since you're displaying a single object, count is 1
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
}
