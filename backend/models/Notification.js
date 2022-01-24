const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotiSchema = new Scchema({
    houseId: {type: mongoose.Types.ObjectId, required: true, ref:'House'},
    products: [{ type: mongoose.Types.ObjectId, ref:'Products' }],
})