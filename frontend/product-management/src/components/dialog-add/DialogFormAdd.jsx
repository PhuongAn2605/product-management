import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

import InputForm from "../input/Input.component.jsx";
import { AddDialogStyle, DialogStyle, AddTextStyle } from "./DialogFormAdd.js";
import { Typography } from "@mui/material";
import ImageUpload from "../input/ImageUpload.js";
import "./DialogFormAdd.css";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { addProductStart } from "../../redux/product/product.actions.js";
import isEmpty from "is-empty";
import { useNavigate } from "react-router";
import { closeDialog, openDialog } from "../../redux/dialog/dialog-actions.js";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            // right: 8,
            // top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const DialogFormAdd = ({
  addProduct,
  userName,
  productImage,
  error,
  closeDialog,
  openDialog,
  closeDialogAction,
  openDialogAction,
}) => {
  
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState(null);
  const [proName, setProName] = useState("");
  const [shortName, setShortName] = useState("");
  const [location, setLocation] = useState("");
  const [expiration, setExpiration] = useState("");
  const [functions, setFunctions] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(productImage);



  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const inputHandler = (pickedFile) => {
    setImage(pickedFile);
  };
  const addProductHandler = (e) => {
    e.preventDefault();

    const product = {
      proName,
      shortName,
      location,
      expiration,
      functions,
      description,
      image,
    };
    const data = {
      product,
      userName,
    };

    addProduct(data);

    setProName("");
    setShortName("");
    setLocation("");
    setExpiration("");
    setFunctions("");
    setDescription("");
    setImage(null);


    handleClose();

    // if(isEmpty(error)){
    //   closeDialog();
    // }else{
    //   return;
    // }
  };

  return (
    <DialogStyle>
      <Button variant="outlined" onClick={handleClickOpen}>
        <AddDialogStyle>
          <AddCircleOutlineOutlinedIcon sx={{ color: red[50] }} />
          <span>Thêm mới đồ vật</span>
        </AddDialogStyle>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll='body'
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          style={{ display: "flex", alignItems: "center" }}
        >
          <AddTextStyle>Thêm mới đồ vật</AddTextStyle>
        </BootstrapDialogTitle>
        <DialogContent
          fullWidth={true}
          maxWidth="xl"
          style={{
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            justifyContent: "center",
          }}
          dividers
        >
          <div>
            <Typography gutterBottom>
              <InputForm
                id="productName"
                name="Tên sản phẩm"
                type="text"
                value={proName}
                onChange={(e) => setProName(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <InputForm
                id="shortName"
                name="Tên viết tắt"
                type="text"
                value={shortName}
                onChange={(e) => setShortName(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <InputForm
                id="location"
                name="Vị trí đặt sản phẩm"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <InputForm
                id="expiration"
                name="Hạn sử dụng sản phẩm"
                type="date"
                value={expiration}
                onChange={(e) => setExpiration(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <Box sx={{ maxWidth: 200 }} style={{ margin: "auto" }}>
                <FormControl style={{ minWidth: 420 }} size="large">
                  <InputLabel id="demo-simple-select-label">
                    Chọn chức năng
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={functions}
                    label="Chọn chức năng"
                    onChange={(e) => setFunctions(e.target.value)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    <MenuItem value="Trang trí">Trang trí</MenuItem>
                    <MenuItem value="Ngồi">Ngồi</MenuItem>
                    <MenuItem value="Đựng đồ">Đựng đồ</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Typography>

            <Typography gutterBottom>
              <InputForm
                id="description"
                name="Mô tả đồ vật"
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </Typography>
          </div>
          <Typography gutterBottom>
            <ImageUpload id="image" center="center" onInput={inputHandler} />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={(e) => addProductHandler(e)}>
            Add Product
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </DialogStyle>
  );
};

const mapStateToProps = (state) => ({
  error: state.product.product,
  userName: state.auth.userName,
  productImage: state.product.productImage,
  openDialog: state.dialog.openDialog,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product, userName) =>
    dispatch(addProductStart(product, userName)),
  closeDialogAction: () => dispatch(closeDialog()),
  openDialogAction: () => dispatch(openDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogFormAdd);
