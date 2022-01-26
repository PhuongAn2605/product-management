import React, { useState } from "react";
import { connect } from "react-redux";
import InputForm from "./Input.component.jsx";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {
  sendCommentStart,
  sendReplyCommentStart,
} from "../../redux/house/house.actions";
import styled from "styled-components";
import { blueGrey } from "@mui/material/colors";
import isEmpty from "is-empty";

const ReplyCommentStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const CommentInput = ({
  sendComment,
  visitHouse,
  houseId,
  commenter,
  title,
  isComment,
  sendReplyComment,
  commentId,
  visit,
  userName,
}) => {
  console.log('visit: ', visit);
  const [inputValue, setInputValue] = useState("");
  const sendCommentHandler = (e) => {
    if(isEmpty(inputValue)){
      alert('Comment is empty!');
    }
    if (isComment && visit) {
      console.log('comment visit: ')
      sendComment(visitHouse._id, inputValue, commenter);
    } else if (isComment && !visit) {
      console.log('comment not visit: ');

      sendComment(houseId, inputValue, commenter);
    } else {
      sendReplyComment(commentId, inputValue, userName);
    }
    setInputValue("");
  };
  const name = title ? title : "Thêm bình luận";

  return (
    <ReplyCommentStyle>
      <InputForm
        id="comment"
        name={name}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        onKeyPress={(e) => {
          if(e.key === "Enter"){
            sendCommentHandler(e);
          }
        }}
      />
      <SendOutlinedIcon
        style={{ color: blueGrey[500] }}
        onClick={(e) => sendCommentHandler(e)}
        
      />
    </ReplyCommentStyle>
  );
};

const mapStateToProps = (state) => ({
  commenter: state.auth.userName,
  visitHouse: state.house.visitHouse,
  houseId: state.auth.houseId,
  userName: state.auth.userName,
});

const mapDispatchToProps = (dispatch) => ({
  sendComment: (visitHouseId, comment, commenter) =>
    dispatch(sendCommentStart(visitHouseId, comment, commenter)),
  sendReplyComment: (commentId, content, userName) =>
    dispatch(sendReplyCommentStart(commentId, content, userName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);
