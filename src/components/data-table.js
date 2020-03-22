import React from "react";
import MaterialTable from "material-table";
import { TableContainer, Paper } from "@material-ui/core";

const Table = ({ monthData, isExpenses }) => {
  const name = isExpenses ? "Expenses" : "Income";
  return (
    <TableContainer component={Paper} elevation={5}>
      <MaterialTable
        columns={[
          { title: "Date", field: "date" },
          { title: "Sum", field: "sum" },
          { title: `${name}`, field: "expenses" },
          { title: "Category", field: "category" }
        ]}
        data={monthData.combinedArrays}
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
