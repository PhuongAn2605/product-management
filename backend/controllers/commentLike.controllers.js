const isEmpty = require("is-empty");
const CommentLike = require("../models/CommentLike");
const HttpError = require("../models/http-error");

const likeReact = async (req, res, next) => {
    const like = req.body.like;
    const commentLike = new CommentLike({
            like: like
        });

    try{
        const saveComment = await commentLike.save();
        if(isEmpty(saveComment)){
            return next(new HttpError('Could not save the comment', 500));
        }

    }catch(err){
        return next(new HttpError('Something went wrong!', 500));
    }

    res.status(201).send('Created');
}

exports.likeReact = likeReact;