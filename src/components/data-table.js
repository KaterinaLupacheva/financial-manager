import React, { useContext, useState } from "react";
import MaterialTable from "material-table";
import { TableContainer, Paper } from "@material-ui/core";
import MonthExpensesContext from "../contexts/monthExpenses.context";
import axios from "axios";
import SnackBar from "./snackbar";
import ConfirmDialog from "./confirmDialog";
import EditForm from "./edit-form";
import SimpleBackdrop from "./simple-backdrop";

const Table = ({ isExpenses }) => {
  const { expensesData, fetchExpenses } = useContext(MonthExpensesContext);
  const [message, setMessage] = useState("");
  const [snackbarIsOpened, openSnackbar] = useState(false);
  const [confirmDialogIsOpened, openConfirmDialog] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [editFormIsOpened, openEditForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const name = isExpenses ? "Expenses" : "Income";

  const handleResponse = res => {
    openConfirmDialog(false);
    if (res === "yes") {
      setIsLoading(true);
      axios
        .delete(`/expenses/${rowData.expenseId}`)
        .then(res => {
          fetchExpenses();
          setMessage(res.data.message);
          openSnackbar(true);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

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
          options={{
            toolbar: false,
            paging: false,
            headerStyle: {
              backgroundColor: "#9c27b0",
              color: "#FFF",
              fontWeight: "bold"
            },
            actionsColumnIndex: -1
          }}
          actions={[
            rowData => ({
              icon: "delete",
              onClick: (event, rowData) => {
                openConfirmDialog(true);
                setRowData(rowData);
              },
              hidden: !rowData.expenseId
            }),
            rowData => ({
              icon: "create",
              onClick: (event, rowData) => {
                setRowData(rowData);
                openEditForm(true);
              },
              hidden: !rowData.expenseId
            })
          ]}
          style={{ borderBottom: "1px solid black" }}
        />
      </TableContainer>
      <SnackBar
        isOpened={snackbarIsOpened}
        message={message}
        handleSnackBarClose={() => openSnackbar(false)}
      />
      <ConfirmDialog
        open={confirmDialogIsOpened}
        handleResponse={handleResponse}
      />
      {rowData && (
        <EditForm
          open={editFormIsOpened}
          handleClose={() => openEditForm(false)}
          rowData={rowData}
        />
      )}
      <SimpleBackdrop open={isLoading} />
    </>
  );
};

export default Table;
