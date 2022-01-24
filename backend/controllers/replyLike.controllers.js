const ReplyLike = require("../models/ReplyLike");
const HttpError = require("../models/http-error");
const Reply = require("../models/Reply");
const isEmpty = require("is-empty");

const likeReact = async (req, res, next) => {
  const { like, userName } = req.body;
  const replyId = req.params.replyId;

  const reply = await Reply.findById(replyId);
  let targetReplyLikes;

  if (like) {
    const replyLike = new ReplyLike({
      replyId,
      userName,
    });
    try {
      const saveReplyLike = await replyLike.save();
      if (isEmpty(saveReplyLike)) {
        return next(new HttpError("Could not save the like", 500));
      }

      // reply.replyLikes.push(saveReplyLike)
    } catch (err) {}
  }

  try {
    const saveReplyLike = await ReplyLike.save();
  } catch (err) {
    return next(new HttpError("Something went wrong!", 500));
  }

  res.status(201).send("Created");
};

exports.replyLikeReact = replyLikeReact;
