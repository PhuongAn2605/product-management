const { validationResult } = require('express-validator');
const isEmpty = require('is-empty');
const HttpError = require('../models/http-error');
const Product = require('../models/Product');
const Reply = require('../models/Reply');

const getReply = async (req, res, next) => {
    let reply;
    try{
        // reply = await Reply.find({ productId: productId, houseId: houseId });
        replies = await Reply.find({});
        if(isEmpty(replies)){
            return next(new HttpError('Could not find any reply', 400));
        }
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong', 500));
    }
    res.status(200).json({ replies });
}

const createReply = async (req, res, next ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid data passed', 422));
    }

    const commentId = req.params.cid;
    const { content } = req.body;

    const createdReply = new Reply({
        content,
        commentId
    })

    try{
        const saveReply = await createdReply.save();
        if(isEmpty(saveReply)){
            return next(new HttpError('Could not save the product', 500));
        }
    }catch(err){
        console.log(err);
        return next(new HttpError('Something went wrong, could not reply', 500));
    }

    res.status(201).json({ reply: createdReply.content });

}

exports.createReply = createReply;
exports.getReply = getReply;