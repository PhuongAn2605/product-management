const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const houseSchema = new Schema({
    name: { type: String, required: true },
    userId: {type: mongoose.Types.ObjectId, required: true, ref:'User'},
    products: [{ type: mongoose.Types.ObjectId, ref:'Product' }],
    comments: [{ type: mongoose.Types.ObjectId, ref:'Comment' }]
});

module.exports = mongoose.model('House', houseSchema);