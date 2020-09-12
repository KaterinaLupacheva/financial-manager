import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { createHeadCells } from "../utils/transform-data.utils";
import { getMonthsNames } from "../utils/date.utils";
import { pivotTableStyles } from "../styles/pivot-table.styles";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const EnhancedTableHead = (props) => {
  const { classes, order, orderBy, onRequestSort, startDate, endDate } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.headStyle}>
      <TableRow>
        {createHeadCells(startDate, endDate).map((headCell) => (
          <TableCell
            className={classes.headCellStyle}
            key={headCell.id}
            align={headCell.right ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const useStyles = makeStyles(pivotTableStyles);

const PivotTable = ({ rows, totalRow, startDate, endDate }) => {
  const classes = useStyles();
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("avg");

  const monthNames = getMonthsNames(startDate, endDate)[0];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography
          className={classes.title}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Expenses Structure
        </Typography>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"small"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              startDate={startDate}
              endDate={endDate}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow key={row.name}>
                      <TableCell component="td" id={labelId} scope="row">
                        {row.name}
                      </TableCell>
                      {monthNames.map((month) => (
                        <TableCell key={`${row.name}-${month}-${row[month]}`}>
                          {row[month].toFixed(2)}
                        </TableCell>
                      ))}
                      <TableCell align="right" style={{ fontWeight: "bold" }}>
                        {row.avg.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
            {totalRow.avg ? (
              <TableFooter>
                <TableRow>
                  <TableCell className={classes.totalRow}>
                    {totalRow.name}
                  </TableCell>
                  {monthNames.map((month) => (
                    <TableCell
                      key={`${totalRow.name}-${month}`}
                      className={classes.totalRow}
                    >
                      {totalRow[month].toFixed(2)}
                    </TableCell>
                  ))}
                  <TableCell align="right" className={classes.totalRow}>
                    {totalRow.avg.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            ) : null}
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default PivotTable;
