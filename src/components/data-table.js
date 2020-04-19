import React, { useContext, useState } from "react";
import MaterialTable from "material-table";
import { TableContainer, Paper } from "@material-ui/core";
import axios from "axios";
import SnackBar from "./snackbar";
import ConfirmDialog from "./confirmDialog";
import EditForm from "./edit-form";
import { MonthDataContext } from "../contexts/monthData.context";
import { format } from "date-fns";

const Table = ({ isExpenses, tableData }) => {
  const { monthData, setMonthData } = useContext(MonthDataContext);
  const [message, setMessage] = useState("");
  const [snackbarIsOpened, openSnackbar] = useState(false);
  const [confirmDialogIsOpened, openConfirmDialog] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [editFormIsOpened, openEditForm] = useState(false);
  const name = isExpenses ? "Expenses" : "Income";

  const removeItem = array => {
    return array.filter(obj => {
      return obj.id !== rowData.id;
    });
  };

  const handleResponse = res => {
    openConfirmDialog(false);
    if (res === "yes") {
      let requestBody = {};
      if (isExpenses) {
        requestBody = {
          expenses:
            removeItem(monthData.expenses).length > 0
              ? removeItem(monthData.expenses)
              : null
        };
      } else {
        requestBody = {
          incomes:
            removeItem(monthData.incomes).length > 0
              ? removeItem(monthData.incomes)
              : null
        };
      }

      const dateParts = rowData.date.split(".");
      const monthYear = format(
        new Date(dateParts[2], dateParts[1] - 1, dateParts[0], 8),
        "MMM-yyyy"
      );
      axios
        .put(
          `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/month/${monthYear}`,
          requestBody
        )
        .then(() => {
          setMessage("Entry deleted");
          openSnackbar(true);
          if (isExpenses) {
            setMonthData({
              ...monthData,
              expenses: requestBody.expenses
            });
          } else {
            setMonthData({
              ...monthData,
              incomes: requestBody.incomes
            });
          }
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
            {
              title: "Date",
              field: "date",
              render: rowData => {
                return rowData.details === "" ? (
                  <span style={{ fontWeight: "bold" }}>{rowData.date}</span>
                ) : (
                  <span>{rowData.date}</span>
                );
              }
            },
            {
              title: "Sum",
              field: "sum",
              render: rowData => {
                return rowData.details === "" ? (
                  <span style={{ fontWeight: "bold" }}>{rowData.sum}</span>
                ) : (
                  <span>{parseFloat(rowData.sum).toFixed(2)}</span>
                );
              }
            },
            {
              title: `${name}`,
              field: "details"
            },
            {
              title: "Category",
              field: "category"
            }
          ]}
          data={tableData.combinedArrays}
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
              icon: "create",
              onClick: (event, rowData) => {
                setRowData(rowData);
                openEditForm(true);
              },
              hidden: !rowData.parentId
            }),
            rowData => ({
              icon: "delete",
              onClick: (event, rowData) => {
                openConfirmDialog(true);
                setRowData(rowData);
              },
              hidden: !rowData.parentId
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
          isExpenses={isExpenses}
        />
      )}
    </>
  );
};

export default Table;
