import * as React from "react";
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
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    openSnackBar: false,
    snackbarText: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const _id = params;
  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`/api/product/${_id}`);
      console.log("success", response);
      setState({
        ...state,
        openSnackBar: true,
        snackbarText: "Амжилттай устглаа",
      });
    } catch (e) {
      console.error("error", e);
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
            {} устгах{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Болих </Button>
          <Button variant="contained" onClick={deleteProduct} autoFocus>
            Устгах
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={state.openSnackBar}
        autoHideDuration={1500}
        onClose={() => setState({ ...state, openSnackBar: false })}
      >
        <Alert
          onClose={() => setState({ ...state, openSnackBar: false })}
          severity="success"
          sx={{ width: "100%" }}
        >
          {state.snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
}
