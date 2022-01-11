const ReplyLike = require("../models/ReplyLike");
const HttpError = require("../models/http-error");

const likeReact = async (req, res, next) => {
    const like = req.body.like;
    const replyLike = new ReplyLike({
            like: like
        });

    try{
        const saveReplyLike = await ReplyLike.save();

    }catch(err){
        return next(new HttpError('Something went wrong!', 500));
    }

    res.status(201).send('Created');
}

exports.replyLikeReact = replyLikeReact;