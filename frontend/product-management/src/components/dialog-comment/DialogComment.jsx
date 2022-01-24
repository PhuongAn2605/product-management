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
import Badge from "@mui/material/Badge";

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
  LargeCommentDivStyle,
  DisplayCommentStyle,
} from "./DialogComment.js";
import { Typography } from "@mui/material";

import { closeDialog, openDialog } from "../../redux/dialog/dialog-actions.js";
import {
  getCommentsByHouseIdStart,
  likeCommentStart,
  sendCommentStart,
} from "../../redux/house/house.actions.js";
import CommentItem from "../comment-item/CommentItem.jsx";
import CommentInput from "../input/CommentInput.jsx";
import isEmpty from "is-empty";

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
  visit,
  // commentDetails,
  comments,
  targetComments,
  sendComment,
  likeComment,
  commentLikes,
  houseId,
}) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [commentCount, setCommentCount] = useState(comments.length);
  const commenter = userName;
  const visitHouseId = visit ? visitHouse._id : houseId;

  const [isLiked, setIsLiked] = useState(false);
  let likedCommentIds = [];

  // useEffect(() => {
  //   getCommentsByHouseId(visitHouseId);
  //   console.log('comments: ', comments);
  // });

  // useEffect(() => {
  //   console.log('dialog comment: ')
  //   if(!isEmpty(visitHouseId)){
  //     for(let like of commentLikes){
  //       likedCommentIds.push(like.commentId);
  //     }
  //   }
  // },[]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const sendCommentHandler = (e) => {
    sendComment(visitHouseId, commentValue, commenter);
    setCommentCount(commentCount + 1);
    setCommentValue("");
  };

  return (
    <DialogStyle>
      <Button variant="outlined" onClick={handleClickOpen}>
        <AddDialogStyle>
          <Badge
            badgeContent={comments.length > 0 ? comments.length : "0"}
            color="success"
          >
            <ChatBubbleOutlineOutlinedIcon fontSize="large" color="primary" />
          </Badge>
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
          <AddTextStyle>
            {visit ? (
              <span>
                Bạn nghĩ gì về {visitHouse.name}
                ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            ) : (
              <span>
                Bình luận về nhà của
                bạn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            )}
          </AddTextStyle>
        </BootstrapDialogTitle>
        <DialogContent
          fullWidth={true}
          maxWidth="xl"
          style={{
            overflow: "hidden",
            display: "flex",
            justifyContent: "flex-start",
            margin: "1rem",
          }}
          dividers
        >
          <LargeCommentDivStyle>
            <OtherCommentsStyle>Tất cả bình luận</OtherCommentsStyle>
            {comments && comments.length > 0 ? (
              comments.map((comment) => {
                return (
                  <DisplayCommentStyle>
                    <CommentItem
                      key={comment._id}
                      comment={comment}
                      userName={userName}
                      isReplied={false}
                      visit={visit}
                    />
                  </DisplayCommentStyle>
                );
              })
            ) : (
              <div>Chưa có ai bình luận!</div>
            )}
            <Typography gutterBottom>
              <CommentInput isComment={true} />
            </Typography>
          </LargeCommentDivStyle>
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
  targetComments: state.house.targetComments,
  commentLikes: state.house.commentLikes,
  houseId: state.auth.houseId,
  comments: state.house.targetComments,
});

const mapDispatchToProps = (dispatch) => ({
  closeDialogAction: () => dispatch(closeDialog()),
  openDialogAction: () => dispatch(openDialog()),
  getCommentsByHouseId: (houseId) =>
    dispatch(getCommentsByHouseIdStart(houseId)),
  sendComment: (visitHouseId, comment, commenter) =>
    dispatch(sendCommentStart(visitHouseId, comment, commenter)),
  likeComment: (commentId, like, userName) =>
    dispatch(likeCommentStart(commentId, like, userName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogComment);
