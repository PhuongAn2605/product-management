const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replyLikeSchema = new Schema({

    replyId: {type: mongoose.Types.ObjectId, required: true, ref:'Reply'},
    userId: {type: mongoose.Types.ObjectId, required: true, ref:'User'},
    like: { type: Boolean, required: true}
});

module.exports = mongoose.model('ReplyLike', replyLikeSchema);