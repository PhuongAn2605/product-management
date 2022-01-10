const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentLikeSchema = new Schema({

    commentId: {type: mongoose.Types.ObjectId, required: true, ref:'Comment'},
    userId: {type: mongoose.Types.ObjectId, required: true, ref:'User'},
    like: { type: Boolean, required: true}
});

module.exports = mongoose.model('CommentLike', commentLikeSchema);