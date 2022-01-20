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
import { styled } from "@mui/material/styles";

import InputForm from "../input/Input.component.jsx";
import { DialogStyle, AddTextStyle } from "./DialogFormEdit.js";
import { Typography } from "@mui/material";
import ImageUpload from "../input/ImageUpload.js";
import "./DialogFormEdit.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import {
  addProductStart,
  editProductStart,
} from "../../redux/product/product.actions.js";
import isEmpty from "is-empty";
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

const DialogFormEdit = ({
  addProduct,
  userName,
  productImage,
  id,
  products,
  editProduct,
}) => {
  // console.log(products)
  let productToEdit;
  if (!isEmpty(products)) {
    productToEdit = products.filter((p) => p._id === id);
    console.log(productToEdit);
  }

  const {
    productName,
    shortName,
    location,
    image,
    houseId,
    functions,
    expiration,
    description,
  } = productToEdit[0];
  const formatedExpiration = new Date(expiration)
    .toISOString()
    .substring(0, 10);

  // console.log(productName);

  const [open, setOpenDialogEdit] = useState(false);
  const [errors, setErrors] = useState(null);
  const [proNameValue, setProName] = useState(productName);
  const [shortNameValue, setShortName] = useState(shortName);
  const [locationValue, setLocation] = useState(location);
  const [expirationValue, setExpiration] = useState(formatedExpiration);
  const [functionsValue, setFunctions] = useState(functions);
  const [descriptionValue, setDescription] = useState(description);
  const [imageValue, setImage] = useState(image);

  // console.log(new Date(expirationValue).toISOString().substring(0, 10));
  // console.log(functions);

  const handleDialogOpen = () => {
    setOpenDialogEdit(true);
  };
  const handleDialogClose = () => {
    setOpenDialogEdit(false);
  };

  const inputHandler = (pickedFile) => {
    setImage(pickedFile);
  };

  const editProductHander = (e) => {
    e.preventDefault();

    const product = {
      proNameValue,
      shortNameValue,
      locationValue,
      expirationValue,
      functionsValue,
      descriptionValue,
      imageValue,
      id,
    };

    // console.log(product);

    editProduct(product);
    handleDialogClose();
  };

  return (
    <DialogStyle>
      <Button variant="outlined" onClick={handleDialogOpen}>
        <span>Edit</span>
      </Button>
      <BootstrapDialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleDialogClose}
          style={{ display: "flex", alignItems: "center" }}
        >
          <AddTextStyle>Sửa thông tin sản phẩm</AddTextStyle>
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
                value={proNameValue}
                onChange={(e) => setProName(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <InputForm
                id="shortName"
                name="Tên viết tắt"
                type="text"
                value={shortNameValue}
                onChange={(e) => setShortName(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <InputForm
                id="location"
                name="Vị trí đặt sản phẩm"
                type="text"
                value={locationValue}
                onChange={(e) => setLocation(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <InputForm
                id="expiration"
                name="Hạn sử dụng sản phẩm"
                type="date"
                value={expirationValue}
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
                    value={functionsValue}
                    label="Chọn chức năng"
                    onChange={(e) => setFunctions(e.target.value)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    {functionsValue == "Trang trí" ? (
                      <MenuItem value={"Trang trí"} selected>
                        Trang trí
                      </MenuItem>
                    ) : (
                      <MenuItem value={"Trang trí"}>Trang trí</MenuItem>
                    )}
                    {functionsValue == "Ngồi" ? (
                      <MenuItem value={"Ngồi"} selected>
                        Ngồi
                      </MenuItem>
                    ) : (
                      <MenuItem value={"Ngồi"}>Ngồi</MenuItem>
                    )}
                    {functionsValue == "Đựng đồ" ? (
                      <MenuItem value={"Đựng đồ"} selected>
                        Đựng đồ
                      </MenuItem>
                    ) : (
                      <MenuItem value={"Đựng đồ"}>Đựng đồ</MenuItem>
                    )}

                    {/* <MenuItem value={"Trang trí"} selected={false} >Trang trí</MenuItem>
                    <MenuItem value="Ngồi">Ngồi</MenuItem>
                    <MenuItem value="Đựng đồ">Đựng đồ</MenuItem> */}
                  </Select>
                </FormControl>
              </Box>
            </Typography>

            <Typography gutterBottom>
              <InputForm
                id="description"
                name="Mô tả đồ vật"
                type="text"
                value={descriptionValue}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </Typography>
          </div>
          <Typography gutterBottom>
            <ImageUpload
              id="image"
              center="center"
              onInput={inputHandler}
              imageUrl={`http://localhost:5000/${imageValue}`}
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={(e) => editProductHander(e)}>
            Save
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
  products: state.product.products,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product, userName) =>
    dispatch(addProductStart(product, userName)),
  closeDialogAction: () => dispatch(closeDialog()),
  openDialogAction: () => dispatch(openDialog()),
  editProduct: (product) => dispatch(editProductStart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogFormEdit);
