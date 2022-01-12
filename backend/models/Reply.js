const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({

    commentId: {type: mongoose.Types.ObjectId, required: true, ref:'Comment'},
    content: { type: String, required: true}
});

module.exports = mongoose.model('Reply', replySchema);