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
  let productToEdit;
  if (!isEmpty(products)) {
    productToEdit = products.filter((p) => p._id === id);
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

  const [open, setOpenDialogEdit] = useState(false);
  const [errors, setErrors] = useState(null);
  const [proNameValue, setProName] = useState(productName);
  const [shortNameValue, setShortName] = useState(shortName);
  const [locationValue, setLocation] = useState(location);
  const [expirationValue, setExpiration] = useState(formatedExpiration);
  const [functionsValue, setFunctions] = useState(functions);
  const [descriptionValue, setDescription] = useState(description);
  const [imageValue, setImage] = useState(image);

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
        scroll='body'
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleDialogClose}
          style={{ display: "flex", alignItems: "center" }}
        >
          <AddTextStyle>S???a th??ng tin s???n ph???m</AddTextStyle>
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
                name="T??n s???n ph???m"
                type="text"
                value={proNameValue}
                onChange={(e) => setProName(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <InputForm
                id="shortName"
                name="T??n vi???t t???t"
                type="text"
                value={shortNameValue}
                onChange={(e) => setShortName(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <InputForm
                id="location"
                name="V??? tr?? ?????t s???n ph???m"
                type="text"
                value={locationValue}
                onChange={(e) => setLocation(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <InputForm
                id="expiration"
                name="H???n s??? d???ng s???n ph???m"
                type="date"
                value={expirationValue}
                onChange={(e) => setExpiration(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <Box sx={{ maxWidth: 200 }} style={{ margin: "auto" }}>
                <FormControl style={{ minWidth: 420 }} size="large">
                  <InputLabel id="demo-simple-select-label">
                    Ch???n ch???c n??ng
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={functionsValue}
                    label="Ch???n ch???c n??ng"
                    onChange={(e) => setFunctions(e.target.value)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    {functionsValue == "Trang tr??" ? (
                      <MenuItem value={"Trang tr??"} selected>
                        Trang tr??
                      </MenuItem>
                    ) : (
                      <MenuItem value={"Trang tr??"}>Trang tr??</MenuItem>
                    )}
                    {functionsValue == "Ng???i" ? (
                      <MenuItem value={"Ng???i"} selected>
                        Ng???i
                      </MenuItem>
                    ) : (
                      <MenuItem value={"Ng???i"}>Ng???i</MenuItem>
                    )}
                    {functionsValue == "?????ng ?????" ? (
                      <MenuItem value={"?????ng ?????"} selected>
                        ?????ng ?????
                      </MenuItem>
                    ) : (
                      <MenuItem value={"?????ng ?????"}>?????ng ?????</MenuItem>
                    )}

                    {/* <MenuItem value={"Trang tr??"} selected={false} >Trang tr??</MenuItem>
                    <MenuItem value="Ng???i">Ng???i</MenuItem>
                    <MenuItem value="?????ng ?????">?????ng ?????</MenuItem> */}
                  </Select>
                </FormControl>
              </Box>
            </Typography>

            <Typography gutterBottom>
              <InputForm
                id="description"
                name="M?? t??? ????? v???t"
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
