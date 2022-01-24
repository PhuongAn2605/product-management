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
import HdrStrongTwoToneIcon from "@mui/icons-material/HdrStrongTwoTone";
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
  commentLikes,
  getRepliesByCommentId,
  replyComments,
  visit,
  isReplied,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isReply, setIsReply] = useState(isReplied);
  const [isLevel1, setIsLevel1] = useState(false);
  const [commentLikeCount, setCommentLikeCount] = useState(commentLikes.length);
  console.log("commentLikes: ", commentLikes.length);

  const { commenter, content } = comment;
  // console.log('comment: ', comment);
  const commentId = comment._id;

  // useEffect(() => {
  //   getRepliesByCommentId(commentId);
  // },[commentId]);

  useEffect(() => {
    console.log("comment id item");
    if (!isEmpty(commentLikes)) {
      for (let like of commentLikes) {
        if (like.commentId === commentId && like.userName === userName) {
          console.log(like);
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      }
    }
  }, []);

  const onLikeClickHandler = (e) => {
    // e.preventDefault();
    console.log("before: ", isLiked);

    setIsLiked(!isLiked);

    // likeComment(commentId, isLiked, userName);
  };

  const replyCommentHandler = (e) => {
    console.log('comment id: ', commentId);
    getRepliesByCommentId(commentId);

    setIsReply(true);
  };

  useEffect(() => {
    if (isLiked) {
      setCommentLikeCount(commentLikeCount + 1);
    } else {
      if (commentLikeCount > 0) {
        setCommentLikeCount(commentLikeCount - 1);
      }
    }

    likeComment(commentId, isLiked, userName);
    // return;
  }, [isLiked]);

  const DisplayReplyComment = () => {
    return (
      <div>
        {!isEmpty(replyComments) &&
          replyComments.map((r) => {
            return (
              <DisplayReplyCommentStyle>
                <CommentItem
                  key={r._id}
                  comment={r}
                  userName={userName}
                  likeComment={likeComment}
                  commentLikes={commentLikes}
                  getRepliesByCommentId
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
                ? "Trả lời chính bạn"
                : "Trả lời " + commenter
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
            {commenter === userName ? "Bạn" : commenter}
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
              <Badge badgeContent={commentLikeCount}>
                <FavoriteBorderIcon
                  style={{ color: red[600] }}
                  onClick={() => setIsLiked(!isLiked)}
                />
              </Badge>
            ) : (
              <Badge badgeContent={commentLikeCount}>
                <FavoriteOutlinedIcon
                  style={{ color: red[600] }}
                  onClick={() => setIsLiked(!isLiked)}
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
  commentLikes: state.house.commentLikes,
  replyComments: state.house.replyComments,
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
