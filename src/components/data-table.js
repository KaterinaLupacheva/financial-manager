import React, { useContext, useState } from "react";
import MaterialTable from "material-table";
import { TableContainer, Paper } from "@material-ui/core";
import MonthExpensesContext from "../contexts/monthExpenses.context";
import axios from "axios";
import SnackBar from "./snackbar";

const Table = ({ isExpenses }) => {
  const { expensesData, fetchExpenses } = useContext(MonthExpensesContext);
  const [message, setMessage] = useState("");
  const [snackbarIsOpened, openSnackbar] = useState(false);
  const name = isExpenses ? "Expenses" : "Income";
  return (
    <>
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
          editable={{
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    axios
                      .delete(`/expenses/${oldData.expenseId}`)
                      .then(res => {
                        fetchExpenses();
                        setMessage(res.data.message);
                        openSnackbar(true);
                      })
                      .catch(err => {
                        console.error(err);
                      });
                  }
                  resolve();
                }, 1000);
              })
          }}
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
      <SnackBar
        isOpened={snackbarIsOpened}
        message={message}
        handleSnackBarClose={() => openSnackbar(false)}
      />
    </>
  );
};

export default Table;
