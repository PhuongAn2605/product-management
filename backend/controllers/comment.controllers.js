const { validationResult } = require('express-validator');
const isEmpty = require('is-empty');
const Comment = require('../models/Comment');
const HttpError = require('../models/http-error');
const Product = require('../models/Product');

const getComment = async (req, res, next) => {
    let comment;
    try{
        // comment = await Comment.find({ productId: productId, houseId: houseId });
        comment = await Comment.find({});
        if(isEmpty(comment)){
            return next(new HttpError('Could not find any comment', 400));
        }

    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong', 500));
    }
    res.status(200).json({ comment: comment.content });
}

const createComment = async (req, res, next ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid data passed', 422));
    }

    const productId = req.params.pid;

    const { content, userId } = req.body;

    const createdComment = new Comment({
        productId,
        content
    });

    try{
        const saveComment = await createdComment.save();
        if(isEmpty(saveComment)){
            return next(new HttpError('Could not save the product', 500));
        }
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong, could not make a comment', 500));
    }

    res.status(201).json({ comment: createdComment.content });

}

exports.createComment = createComment;
exports.getComment = getComment;