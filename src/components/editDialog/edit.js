import React, { useState, useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Alert, Box, Snackbar, TextField } from "@mui/material";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDialog({ params }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    product: {
      name: "",
      price: "",
      description: "",
      count: "",
    },
    openSnackBar: false,
    snackbarText: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      product: {
        ...prevState.product,
        [name]: value,
      },
    }));
  };

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`/api/product/${params}`);
      console.log("data", response.data);
    } catch (err) {
      console.error("error", err);
    }
  }, [params]);

  const updateProduct = useCallback(async () => {
    try {
      const response = await axios.put(`/api/product/${params}`, state.product);
      console.log("updated data", response.data);

      setState((prevState) => ({
        ...prevState,
        openSnackBar: true,
        snackbarText: "Амжилттай шинэчлэгдлээ",
        product: response.data.data,
      }));
    } catch (err) {
      console.error("error", err);
    }
  }, [params, state.product]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <ModeEditIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ margin: "2rem 0 1rem 2rem" }}>
          {"Бүтээгдэхүүний мэдээлэл засах"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: 400,
              maxWidth: "100%",
              margin: "1rem",
            }}
          >
            <TextField
              fullWidth
              label="Нэр"
              id="name"
              name="name"
              onChange={handleChange}
              value={state.product.name}
            />
            <TextField
              sx={{ marginTop: "1rem" }}
              fullWidth
              label="Үнэ"
              id="price"
              name="price"
              onChange={handleChange}
              value={state.product.price}
            />
            <TextField
              sx={{ marginTop: "1rem" }}
              fullWidth
              label="Тайлбар"
              id="description"
              name="description"
              inputProps={{
                style: {
                  height: "50px",
                },
              }}
              onChange={handleChange}
              value={state.product.description}
            />
            <TextField
              sx={{ marginTop: "1rem" }}
              fullWidth
              label="Агуулхад үлдсэн тоо"
              id="count"
              name="count"
              onChange={handleChange}
              value={state.product.count}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Буцах</Button>
          <Button variant="contained" onClick={updateProduct}>
            Хадгалах
          </Button>
        </DialogActions>
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
      </Dialog>
    </div>
  );
}
