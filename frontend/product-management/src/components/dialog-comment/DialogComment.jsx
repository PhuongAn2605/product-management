import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InputForm from "../input/Input.component.jsx";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

import {
  AddDialogStyle,
  DialogStyle,
  AddTextStyle,
  CommentStyle,
  CommenterStyle,
  ContentStyle,
  CommentContentStyle,
  CommentContentRightStyle,
  OtherCommentsStyle,
  CommentSpanStyle,
} from "./DialogComment.js";
import { Typography } from "@mui/material";

import { closeDialog, openDialog } from "../../redux/dialog/dialog-actions.js";
import {
  getCommentsByHouseIdStart,
  likeCommentStart,
  sendCommentStart,
} from "../../redux/house/house.actions.js";
import CommentItem from "../comment-item/CommentItem.jsx";

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

const DialogComment = ({
  addProduct,
  userName,
  productImage,
  error,
  closeDialog,
  openDialog,
  closeDialogAction,
  openDialogAction,
  visitHouse,
  getCommentsByHouseId,
  commentDetails,
  sendComment,
  likeComment,
}) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  console.log(visitHouse);
  const commenter = userName;
  const visitHouseId = visitHouse._id;

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    getCommentsByHouseId(visitHouseId, commenter);
  }, []);

  console.log(commentDetails);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const sendCommentHandler = (e) => {
    // console.log(e);
    console.log("comment: ", commentValue);
    console.log("commenter: ", commenter);

    sendComment(visitHouseId, commentValue, commenter);
    setCommentValue("");
  };

  

  return (
    <DialogStyle>
      <Button variant="outlined" onClick={handleClickOpen}>
        <AddDialogStyle>
          <ChatBubbleOutlineOutlinedIcon fontSize="large" />
        </AddDialogStyle>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          style={{ display: "flex", alignItems: "center" }}
        >
          <AddTextStyle>
            Bạn nghĩ gì về {visitHouse.name}
            ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </AddTextStyle>
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
            <OtherCommentsStyle>Các bình luận khác</OtherCommentsStyle>
            {commentDetails.length > 0 &&
              commentDetails.map((comment) => (
                <CommentItem key={comment._id} comment={comment} userName={userName}/>
              ))}
            <Typography gutterBottom>
              <InputForm
                id="comment"
                name="Thêm bình luận"
                type="text"
                value={commentValue}
                onChange={(e) => setCommentValue(e.currentTarget.value)}
              />
              <SendOutlinedIcon onClick={(e) => sendCommentHandler(e)} />
            </Typography>
          </div>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Thoát
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
  visitHouse: state.house.visitHouse,
  commentDetails: state.house.commentDetails,
});

const mapDispatchToProps = (dispatch) => ({
  closeDialogAction: () => dispatch(closeDialog()),
  openDialogAction: () => dispatch(openDialog()),
  getCommentsByHouseId: (houseId, commenter) =>
    dispatch(getCommentsByHouseIdStart(houseId, commenter)),
  sendComment: (visitHouseId, comment, commenter) =>
    dispatch(sendCommentStart(visitHouseId, comment, commenter)),
  likeComment: (commentId, like, userName) => dispatch(likeCommentStart(commentId, like, userName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogComment);
