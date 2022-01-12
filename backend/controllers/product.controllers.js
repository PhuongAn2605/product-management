const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const isEmpty = require("is-empty");
const Product = require("../models/Product");
const House = require("../models/House");

const getProductById = async (req, res, next) => {
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
    if (isEmpty(product)) {
      return next(new HttpError("Not find the product", 404));
    }
  } catch (err) {
    console.log(err);
    return next(new HttpError("Could not get the product by provided id", 404));
  }

  res.status(200).json({ product: product.toObject({ getters: true }) });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid data passed, please check your data", 422)
    );
  }

  const {
    productName,
    shortName,
    image,
    price,
    payedPrice,
    expiration,
    functions,
    location,
    description,
    commentId,
    houseId,
  } = req.body;

  const createdProduct = new Product({
    productName,
    shortName,
    image,
    price,
    payedPrice,
    expiration,
    functions,
    location,
    description,
    commentId,
    houseId,
  });

  let existingProduct;
  let saveProduct;
  let house;

  try {
    // existingProduct = await Product.find({ commentId: commentId, houseId:houseId });
    // if(existingProduct){
    //     return next(new HttpError('Product exists already!'));
    // }

    house = await House.findById(houseId);
    if(isEmpty(house)){
      return next(new HttpError('Could not find the house', 404));
    }

    saveProduct = await createdProduct.save();
    if (isEmpty(saveProduct)) {
      return next(new HttpError("Could not save the product", 500));
    }

    house.products.push(createdProduct);
    const saveHouse = await house.save();
    if(isEmpty(saveHouse)){
      return next(new HttpError('Could not save the house', 500));
    }

  } catch (err) {
    console.log(err);

    return next(new HttpError("Creating product failed!", 500));
  }

  res.status(201).json({ productName: createdProduct.productName });
};

const editProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input passed, please check your data.", 422));
  }

  const { productName } = req.body;
  const productId = req.params.pid;

  let product;

  try {
    product = await Product.findById(productId);
    if (isEmpty(product)) {
      return next(new HttpError("Could not find the product", 404));
    }
    product.productName = productName;

    const saveProduct = await product.save();
    if (isEmpty(saveProduct)) {
      return next(new HttpError("Could not save updated product", 500));
    }
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place",
      500
    );
  }
  res.status(200).json({ product: product });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.pid;

  try {
    const product = Product.findById(productId);
    if(isEmpty(product)){
      return next(new HttpError('Could not find the product', 404));
    }

    const deleteProduct = await product.remove();
    if(isEmpty(deleteProduct)){
      return next(new HttpError('Could not delete the product', 500));
    }

  } catch (err) {
    return next(new HttpError('Something went wrong, could not delete the product', 500));
  }

  res.status(201).send('Deleted');
};

exports.createProduct = createProduct;
exports.getProductById = getProductById;
exports.editProduct = editProduct;
exports.deleteProduct = deleteProduct;
