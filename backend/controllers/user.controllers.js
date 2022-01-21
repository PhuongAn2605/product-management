const { validationResult } = require("express-validator");
const isEmpty = require("is-empty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/User");
const House = require("../models/House");
const Product = require("../models/Product");

const signup = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data!", 422)
    );
  }

  const { userName, password } = req.body;

  // console.log(userName, password);
  let existingUser;
  let newUser;
  let saveUser;
  let token;
  let hashedPassword;

  try {
    existingUserName = await User.findOne({ userName: userName });
    if (!isEmpty(existingUserName)) {
      const error = new HttpError(
        "User exists already, please login instead",
        422
      );
      return next(error);
      // const error = "User exists already, please login instead";
      // res.status(422).json(error);
    }

    const existingPassword = await User.findOne({ password: password });
    if (!isEmpty(existingPassword)) {
      return next(
        new HttpError("Password is taken, please try another password", 403)
      );
    }

    if (
      password.match(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,15}$/
      )
    ) {
      // hashedPassword = await bcrypt.hash(password, 12);
      // if (isEmpty(hashedPassword)) {
      //   return next(new HttpError("Could not encrypt the password", 422));
      // }

      newUser = new User({
        userName,
        // password: hashedPassword,
        password: password,
      });
      saveUser = await newUser.save();
      // console.log(saveUser._id);
    } else {
      return next(new HttpError("Wrong password!", 422));
    }

    if (isEmpty(saveUser)) {
      return next(new HttpError("Can not save the user", 500));
    }

    const newHouse = new House({
      name: userName + "'s house",
      userId: saveUser._id,
      products: [],
      comments: []
    });

    const saveHouse = newHouse.save();
    if (isEmpty(saveHouse)) {
      return next(new HttpError("Can not create a house for the user!", 500));
    }

    token = jwt.sign(
      {
        userName: newUser.userName,
      },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
    if (isEmpty(token)) {
      return next(new HttpError("Could not set token", 500));
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError("Sign up failed, please try again!", 500);
    return next(error);
  }

  res.status(201).json({ userName: newUser.userName, token: token });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  // let isValidadPassword = false;
  let token;

  if (!errors.isEmpty()) {
    // console.log(errors)
    return next(
      new HttpError("Invalid inputs passed, please check your data!", 422)
    );
  }

  const { userName, password } = req.body;
  // console.log(userName, password);

  let existingUser;
  let houseOfUser;
  let productsOfHouse = [];

  try {
    existingUser = await User.findOne({
      userName: userName,
      password: password,
    });
    // console.log(existingUser)
    if (isEmpty(existingUser)) {
      return next(new HttpError("Could not find the user", 404));
    }

    const userId = existingUser._id;
    // console.log(existingUser._id);
    houseOfUser = await House.findOne({ userId: userId });
    // console.log(houseOfUser.products);
    const productOfHouseIds = houseOfUser.products;
    for (p of productOfHouseIds) {
      const product = await Product.findById(p);
      productsOfHouse.push(product);
      // console.log(productsOfHouse);
    }
    // console.log(productsOfHouse);
    token = jwt.sign(
      { userName: existingUser.userName },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    return next(new HttpError("Logging in failed, please try again", 500));
  }

  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
      userName: existingUser.userName,
      password: existingUser.password,
      token: token,
      houseId: houseOfUser._id,
      products: productsOfHouse,
    });
};

const logout = async (req, res, next) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out!" });
};

const checkPasswordUnique = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid data passed", 422));
  }

  const { password } = req.body;
  if (isEmpty(password)) {
    return next(new HttpError("Empty password", 422));
  }

  try {
    const existingPassword = User.findOne({ password: password });
    if (!isEmpty(existingPassword)) {
      return next(new HttpError("Password is taken", 422));
    }
  } catch (err) {
    return next(new HttpError("Something went wrong", 500));
  }
  res.status(200).json({ password });
};

exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.checkPasswordUnique = checkPasswordUnique;
