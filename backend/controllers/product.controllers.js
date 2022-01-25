const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const isEmpty = require("is-empty");
const Product = require("../models/Product");
const House = require("../models/House");
const User = require("../models/User");
const fs = require('fs');

const escapeRegExp = (string = "") =>
  String(string).replace(/[.*+?^${}()|[]\]/g, "$&");
const regExpSearch = (string = "") => {
  const regex = new RegExp(escapeRegExp(string), "i");
  return regex;
};

const getProducts = async (req, res, next) => {
  let products;

  try {
    products = await Product.find({});
  } catch (err) {
    const error = new HttpError("Fetching users failed", 500);
    return next(error);
  }

  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

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

  const userName = req.params.userName;
  const productOfUser = await User.findOne({ userName: userName });

  const userId = productOfUser._id;

  const houseOfUser = await House.findOne({ userId: userId });
  const houseId = houseOfUser._id;

  const {
    productName,
    shortName,
    image,
    expiration,
    functions,
    location,
    description,
    // commentId,
  } = req.body;


  const createdProduct = new Product({
    productName,
    shortName,
    image,
    expiration,
    functions,
    location,
    description,
    image: req.file.path,
    houseId,
  });

  houseOfUser.products.push(createdProduct);
  await houseOfUser.save();


  let existingProduct;
  let saveProduct;
  let house;

  try {
    saveProduct = await createdProduct.save();
    if (isEmpty(saveProduct)) {
      return next(new HttpError("Could not save the product", 500));
    }
  } catch (err) {
    console.log(err);
    return next(new HttpError("Creating product failed!", 500));
  }

  res.status(201).json({ product: createdProduct });
};

const editProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data.", 422)
    );
  }

  const {
    productName,
    shortName,
    location,
    expiration,
    functions,
    description,
  } = req.body;
  const productId = req.params.pid;

  let product;

  try {
    product = await Product.findById(productId);
    if (isEmpty(product)) {
      return next(new HttpError("Could not find the product", 404));
    }

    product.productName = productName;
    product.shortName = shortName;
    product.location = location;
    product.expiration = expiration;
    product.functions = functions;
    product.description = description;
    product.image = req.file.path;

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
  let imagePath;

  try {
    const product = await Product.findById(productId).populate('houseId');
    // console.log('product: ', product);
    if (isEmpty(product)) {
      return next(new HttpError("Could not find the product", 404));
    }

    imagePath = product.image;
    const deleteProduct = await product.remove();
    if (isEmpty(deleteProduct)) {
      return next(new HttpError("Could not delete the product", 500));
    }

    product.houseId.products.pull(product);
    await product.houseId.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete the product", 500)
    );
  }
  fs.unlink(imagePath, err => {
    console.log(err);
  })

  res.status(201).send("Deleted");
};

const searchProductByName = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid data passed, please check your data", 422)
    );
  }

  let targetProduct;
  const { productName } = req.body;
  try {
    targetProduct = await Product.find({ productName: regExpSearch(productName) });
    if (isEmpty(targetProduct)) {
      return next(
        new HttpError("Can not find the product with provided name", 404)
      );
    }
  } catch (err) {
    return next(new HttpError("Something went wrong, please try again!", 500));
  }

  res.status(200).json(targetProduct);
};

const searchProductByLocation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid data passed, please check your data", 422)
    );
  }

  let targetProduct;
  const { location } = req.body;

  try {
    targetProduct = await Product.find({ location: regExpSearch(location) });

    if (isEmpty(targetProduct)) {
      return next(
        new HttpError("Can not find the product with provided location", 404)
      );
    }
  } catch (err) {
    return next(new HttpError("Something went wrong, please try again!", 500));
  }

  res.status(200).json(targetProduct);
};

exports.getProducts = getProducts;
exports.createProduct = createProduct;
exports.getProductById = getProductById;
exports.editProduct = editProduct;
exports.deleteProduct = deleteProduct;
exports.searchProductByName = searchProductByName;
exports.searchProductByLocation = searchProductByLocation;
