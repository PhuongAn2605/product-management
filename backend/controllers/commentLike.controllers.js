const isEmpty = require("is-empty");
const Comment = require("../models/Comment");
const CommentLike = require("../models/CommentLike");
const HttpError = require("../models/http-error");

const likeReact = async (req, res, next) => {
  const { like, userName } = req.body;
  const commentId = req.params.commentId;

  const commentLike = new CommentLike({
    commentId,
    like,
    userName,
  });


  let saveLikeComment;
  try {
    saveLikeComment = await commentLike.save();
    console.log('saveLikeComment', saveLikeComment);
    if (isEmpty(saveLikeComment)) {
      return next(new HttpError("Could not save the comment", 500));
    }

    const comment = await Comment.findById(commentId);
    comment.commentLikes.push(saveLikeComment);
    await comment.save();

    console.log('log comment',comment);

  } catch (err) {
      console.log(err);
    return next(new HttpError("Something went wrong!", 500));
  }

  res.status(201).json({ commentLike: saveLikeComment });
};

exports.likeReact = likeReact;
