const { validationResult } = require("express-validator");
const isEmpty = require("is-empty");
const Comment = require("../models/Comment");
const HttpError = require("../models/http-error");
const Product = require("../models/Product");
const House = require("../models/House");

const getComment = async (req, res, next) => {
  let comment;
  try {
    // comment = await Comment.find({ productId: productId, houseId: houseId });
    comment = await Comment.find({});
    if (isEmpty(comment)) {
      return next(new HttpError("Could not find any comment", 400));
    }
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
  res.status(200).json({ comment: comment.content });
};

const createComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid data passed", 422));
  }

  const houseId = req.params.hid;

  const { content, commenter } = req.body;

  const house = await House.findById(houseId);
  // console.log("house: ", house);

  const createdComment = new Comment({
    houseId,
    content,
    commenter,
    commentLike: []
  });

  try {
    const saveComment = await createdComment.save();
    if (isEmpty(saveComment)) {
      return next(new HttpError("Could not save the product", 500));
    }
    house.comments.push(saveComment);
    await house.save();
  } catch (err) {
    // console.log(err);
    return next(
      new HttpError("Something went wrong, could not make a comment", 500)
    );
  }

  res.status(201).json({ comment: createdComment });
};

const getCommentsByHouseId = async (req, res, next) => {
  const houseId = req.params.hid;
  let houseWithComments;
  try {
    // console.log("house: ", await House.findById(houseId));
    houseWithComments = await House.findById(houseId).populate(
      "comments"
    );
    // console.log("house with comments: ", houseWithComments);
    if (!houseWithComments || houseWithComments.comments.length === 0) {
      return next(
        new HttpError("Could not find comments for provided house id", 404)
      );
    }
  } catch (error) {
    // console.log(error);
    return next(new HttpError("Fetching comments failed", 500));
  }

  res.json({
    comments: houseWithComments.comments.map((comment) =>
      comment.toObject({ getters: true })
    ),
  });
};

exports.createComment = createComment;
exports.getComment = getComment;
exports.getCommentsByHouseId = getCommentsByHouseId;
