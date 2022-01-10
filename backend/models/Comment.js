const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({

    productId: {type: mongoose.Types.ObjectId, required: true, ref:'Product'},
    houseId: {type: mongoose.Types.ObjectId, required: true, ref:'House'},
    content: { type: String, required: true}
});

module.exports = mongoose.model('Comment', commentSchema);