import React, { useEffect, useState } from "react";
import MarkChatUnreadTwoToneIcon from "@mui/icons-material/MarkChatUnreadTwoTone";
import { red } from "@mui/material/colors";
import { blue } from "@mui/material/colors";
import Badge from "@mui/material/Badge";

import {
  CommentStyle,
  ContentStyle,
  CommenterStyle,
  CommentContentStyle,
  CommentContentRightStyle,
  DisplayReplyCommentStyle,
  CommentDetailsStyle,
  TimeTrackStyle,
} from "./CommentItem.js";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import {
  getRepliesByCommentIdStart,
  likeCommentStart,
} from "../../redux/house/house.actions.js";
import { connect } from "react-redux";
import isEmpty from "is-empty";
import CommentInput from "../input/CommentInput.jsx";
import moment from "moment";

const CommentItem = ({
  userName,
  comment,
  likeComment,
  getRepliesByCommentId,
  replyComments,
  visit,
  isReplied,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isReply, setIsReply] = useState(isReplied);
  const [initialLike, setInitialLike] = useState(true);

  const { commenter, content, commentLikes } = comment;
  const commentId = comment._id;

  const [commentLikeCount, setCommentLikeCount] = useState(
    commentLikes && commentLikes.length
  );

  useEffect(() => {
    setInitialLike(true);

    if (!isEmpty(commentLikes)) {
      console.log('commentLikes: ', commentLikes);
      for (let like of commentLikes) {
        console.log('comment like: ', like)
        if (like.commentId === commentId && like.userName === userName) {
          setIsLiked(true);
          return;
        }
        // else {
        //   setIsLiked(false);
        // }
      }
      setCommentLikeCount(commentLikes.length);
    }
  }, [commentId, userName, commentLikes]);

  const onLikeClickHandler = () => {
    console.log("before: ", isLiked);

    setIsLiked(!isLiked);
    setInitialLike(false);
  };

  const replyCommentHandler = (e) => {
    getRepliesByCommentId(commentId);
    setIsReply(!isReply);
  };

  useEffect(() => {
    if (!initialLike) {
      if (isLiked) {
        setCommentLikeCount(commentLikeCount + 1);
      } else {
        if (commentLikeCount > 0) {
          setCommentLikeCount(commentLikeCount - 1);
        }
      }
      likeComment(commentId, isLiked, userName);
    }
  }, [isLiked]);

  const DisplayReplyComment = () => {
    let targetReplyComments = [];
    if (!isEmpty(replyComments)) {
      targetReplyComments = replyComments.filter(
        (r) => r.commentId === commentId
      );
    }
    console.log("target reply: ", targetReplyComments);
    return (
      <div>
        {!isEmpty(targetReplyComments) &&
          targetReplyComments.map((r) => {
            return (
              <DisplayReplyCommentStyle>
                <CommentItem
                  key={r._id}
                  comment={r}
                  userName={userName}
                  likeComment={likeComment}
                  commentLikes={commentLikes}
                  // replyComments
                  isReplied={true}
                />
              </DisplayReplyCommentStyle>
            );
          })}
        {!isReplied && (
          <CommentInput
            commentId={commentId}
            isComment={false}
            visit={visit}
            title={
              commenter === userName
                ? "Tr??? l???i ch??nh b???n"
                : "Tr??? l???i " + commenter
            }
          />
        )}
      </div>
    );
  };

  return (
    <CommentStyle>
      <CommentDetailsStyle>
        <CommentContentStyle>
          <CommentTwoToneIcon color={isReply ? "success" : "primary"} />
          &nbsp;&nbsp;&nbsp;
          <CommenterStyle>
            {commenter === userName ? "B???n" : commenter}
            &nbsp;&nbsp;&nbsp;
          </CommenterStyle>
          <ContentStyle>{content}</ContentStyle>
          {isReply && <DisplayReplyComment />}
        </CommentContentStyle>
        {!isReplied && (
          <CommentContentRightStyle>
            <ReplyIcon
              style={{ color: blue[500] }}
              onClick={(e) => replyCommentHandler(e)}
            />
            {!isLiked ? (
              <Badge
                badgeContent={commentLikeCount > 0 ? commentLikeCount : "0"}
              >
                <FavoriteBorderIcon
                  style={{ color: red[600] }}
                  onClick={() => onLikeClickHandler()}
                />
              </Badge>
            ) : (
              <Badge
                badgeContent={commentLikeCount > 0 ? commentLikeCount : "0"}
              >
                <FavoriteOutlinedIcon
                  style={{ color: red[600] }}
                  onClick={() => onLikeClickHandler()}
                />
              </Badge>
            )}
          </CommentContentRightStyle>
        )}
      </CommentDetailsStyle>
      <TimeTrackStyle>{moment(comment.createdAt).fromNow()}</TimeTrackStyle>
    </CommentStyle>
  );
};

const mapDispatchToProps = (dispatch) => ({
  likeComment: (commentId, like, userName) =>
    dispatch(likeCommentStart(commentId, like, userName)),
  getRepliesByCommentId: (commentId) =>
    dispatch(getRepliesByCommentIdStart(commentId)),
});

const mapStateToProps = (state) => ({
  replyComments: state.house.replyComments,
  userName: state.auth.userName,
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
