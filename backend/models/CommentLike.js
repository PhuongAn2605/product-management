const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentLikeSchema = new Schema({

    commentId: {type: mongoose.Types.ObjectId, required: true, ref:'Comment'},
    like: { type: Boolean }
});

module.exports = mongoose.model('CommentLike', commentLikeSchema);