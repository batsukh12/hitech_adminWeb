import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

export default function DeleteDialog({ params }) {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`/api/product/${params}`);
      console.log("success", response);
      setSnackbarText("Амжилттай устгалаа");
      setSnackbarOpen(true);
      handleClose();
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Бүтээгдэхүүн устгах</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            устгах
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ margin: "0 2rem 1rem " }}>
          <Button onClick={handleClose}>Болих</Button>
          <Button variant="contained" onClick={deleteProduct} autoFocus>
            Устгах
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
}
