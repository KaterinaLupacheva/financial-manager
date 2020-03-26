import React, { useContext } from "react";
import MaterialTable from "material-table";
import { TableContainer, Paper } from "@material-ui/core";
import MonthExpensesContext from "../contexts/monthExpenses.context";

const Table = ({ isExpenses }) => {
  const { expensesData } = useContext(MonthExpensesContext);
  const name = isExpenses ? "Expenses" : "Income";
  return (
    <TableContainer component={Paper} elevation={5}>
      <MaterialTable
        columns={[
          { title: "Date", field: "date" },
          { title: "Sum", field: "sum" },
          { title: `${name}`, field: "details" },
          { title: "Category", field: "category" }
        ]}
        data={isExpenses ? expensesData.combinedArrays : ""}
        parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
        options={{
          toolbar: false,
          paging: false,
          headerStyle: {
            backgroundColor: "#9c27b0",
            color: "#FFF",
            fontWeight: "bold"
          }
        }}
        style={{ borderBottom: "1px solid black" }}
      />
    </TableContainer>
  );
};

export default Table;
