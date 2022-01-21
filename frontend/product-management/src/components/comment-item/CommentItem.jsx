import React, {useState} from "react";
import {
  CommentStyle,
  ContentStyle,
  CommenterStyle,
  CommentContentStyle,
  CommentContentRightStyle,
} from "./CommentItem.js";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import { likeCommentStart } from "../../redux/house/house.actions.js";
import { connect } from "react-redux";

const CommentItem = (props) => {
  const [isLiked, setIsLiked] = useState(false);

    const onLikeClickHandler = () => {
        setIsLiked(!isLiked);
        console.log(isLiked);
        props.likeComment(props.comment._id, isLiked, props.userName);
      };
      
  return (
    <CommentStyle>
      <CommentContentStyle>
        <CommenterStyle>{props.comment.commenter}&nbsp;&nbsp;&nbsp;</CommenterStyle>
        <ContentStyle>{props.comment.content}</ContentStyle>
      </CommentContentStyle>
      <CommentContentRightStyle>
        <ReplyIcon />
        {!isLiked ? (
          <FavoriteBorderIcon onClick={() => onLikeClickHandler()} />
        ) : (
          <FavoriteOutlinedIcon onClick={() => onLikeClickHandler()} />
        )}
      </CommentContentRightStyle>
    </CommentStyle>
  );
};

const mapDispatchToProps = dispatch => ({
    likeComment: (commentId, like, userName) => dispatch(likeCommentStart(commentId, like, userName))
})

export default connect(null, mapDispatchToProps)(CommentItem);
