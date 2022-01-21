const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({

    houseId: {type: mongoose.Types.ObjectId, required: true, ref:'House'},
    content: { type: String, required: true},
    commenter: { type: String, required: true},
    commentLikes:  [{ type: mongoose.Types.ObjectId, ref:'commentLike' }]
});

module.exports = mongoose.model('Comment', commentSchema);