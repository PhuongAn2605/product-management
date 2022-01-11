const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: { type: String, required: true },
    shortName: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    payedPrice: { type: Number, required: true },
    expiration: { type: Date, required: true },
    functions: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    // commentId: {
    //   type: mongoose.Types.ObjectId,
    //   required: true,
    //   ref: "Comment",
    // },
    // houseId: { type: mongoose.Types.ObjectId, required: true, ref: "House" },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Product", productSchema);
