import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "is-empty";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

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

import { addProductStart } from "../../redux/product/product.actions.js";
import { useNavigate } from "react-router";
import { closeDialog, openDialog } from "../../redux/dialog/dialog-actions.js";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { formProductValidation } from "../utils/formValidation.js";
import SelectField from "../input/SelectField.jsx";

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

let DialogFormAdd = ({
  addProduct,
  userName,
  productImage,
  errorFromState,
  message,
}) => {
  const [open, setOpen] = useState(false);
  const [noti, setNoti] = useState(null);
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
    if (!isEmpty(errorFromState) && isEmpty(message)) {
      setNoti("Adding failed!")

    } else if (isEmpty(errorFromState) && !isEmpty(message)) {
      alert("Add successfully!");
      handleClose();

    }

    setProName("");
    setShortName("");
    setLocation("");
    setExpiration("");
    setFunctions("");
    setDescription("");
    setImage(null);
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
        scroll="body"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          style={{ display: "flex", alignItems: "center" }}
        >
          <AddTextStyle>Thêm mới đồ vật</AddTextStyle>
        </BootstrapDialogTitle>
        <DialogContent
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
              <Field
                id="Tên sản phẩm"
                name="productName"
                component={InputForm}
                type="text"
                value={proName}
                onChange={(e) => setProName(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <Field
                id="Tên viết tắt"
                name="shortName"
                component={InputForm}
                type="text"
                value={shortName}
                onChange={(e) => setShortName(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <Field
                id="Vị trí đặt sản phẩm"
                name="location"
                component={InputForm}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <Field
                id="Hạn sử dụng sản phẩm"
                name="expiration"
                component={InputForm}
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
              <Field
                id="Mô tả đồ vật"
                name="description"
                component={InputForm}
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
        {!isEmpty(noti) && <div style={{color: "red", textAlign: "center"}}>{noti}</div>}
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
  userName: state.auth.userName,
  productImage: state.product.productImage,
  openDialog: state.dialog.openDialog,
  errorFromState: state.product.error,
  message: state.product.message,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product, userName) =>
    dispatch(addProductStart(product, userName)),
  closeDialogAction: () => dispatch(closeDialog()),
  openDialogAction: () => dispatch(openDialog()),
});

DialogFormAdd = reduxForm({
  form: "dialogFormAdd",
  destroyOnUnmount: false,
  validate: formProductValidation,
})(DialogFormAdd);

const selector = formValueSelector("dialogFormAdd");

DialogFormAdd = connect((state) => ({
  productName: selector(state, "productName"),
  shortName: selector(state, "shortName"),
  location: selector(state, "location"),
  expiration: selector(state, "expiration"),
  description: selector(state, "description"),
  // functions: selector(state, "functions"),
}))(DialogFormAdd);

export default connect(mapStateToProps, mapDispatchToProps)(DialogFormAdd);
