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
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Badge from "@mui/material/Badge";

import { styled } from "@mui/material/styles";

import {
  AddDialogStyle,
  DialogStyle,
  AddTextStyle,
  OtherCommentsStyle,
  LargeCommentDivStyle,
  DisplayCommentStyle,
} from "./DialogComment.js";
import { Typography } from "@mui/material";

import {
  getCommentsByHouseIdStart,
  getRepliesByCommentIdStart,
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
  visitHouse,
  getCommentsByHouseId,
  comments,
  houseId,
  visit,
  userName,
}) => {
  const [open, setOpen] = useState(false);
  const visitHouseId = visit && !isEmpty(visitHouse) ? visitHouse._id : houseId;

  useEffect(() => {
    if (!isEmpty(visitHouse) && visit) {
      getCommentsByHouseId(visitHouse._id);
      console.log("visit comment: ", comments);
    } else {
      getCommentsByHouseId(houseId);
    }
  }, [houseId, visitHouse && visitHouse._id, visit]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
            {visit && !isEmpty(visitHouse) ? (
              <span>
                B???n ngh?? g?? v??? {visitHouse.name}
                ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            ) : (
              <span>
                B??nh lu???n v??? nh?? c???a
                b???n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
            <OtherCommentsStyle>T???t c??? b??nh lu???n</OtherCommentsStyle>
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
              <div>Ch??a c?? ai b??nh lu???n!</div>
            )}
            <Typography gutterBottom>
              <CommentInput isComment={true} />
            </Typography>
          </LargeCommentDivStyle>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Tho??t
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </DialogStyle>
  );
};

const mapStateToProps = (state) => ({
  openDialog: state.dialog.openDialog,
  visitHouse: state.house.visitHouse,
  commentLikes: state.house.commentLikes,
  houseId: state.auth.houseId,
  comments: state.house.targetComments,
  replyComments: state.house.replyComments,
  authComments: state.auth.comments,
});

const mapDispatchToProps = (dispatch) => ({
  getCommentsByHouseId: (houseId) =>
    dispatch(getCommentsByHouseIdStart(houseId)),
  sendComment: (visitHouseId, comment, commenter) =>
    dispatch(sendCommentStart(visitHouseId, comment, commenter)),
  likeComment: (commentId, like, userName) =>
    dispatch(likeCommentStart(commentId, like, userName)),
  getRepliesByCommentId: (commentId) =>
    dispatch(getRepliesByCommentIdStart(commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogComment);
