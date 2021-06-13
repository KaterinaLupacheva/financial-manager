import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

const ConfirmDialog = ({ open, handleResponse }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleResponse}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete entry?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleResponse("no")} color="primary">
            <CloseIcon fontSize="large" color="error" />
          </Button>
          <Button
            onClick={() => handleResponse("yes")}
            color="primary"
            autoFocus
          >
            <DoneIcon fontSize="large" color="action" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
