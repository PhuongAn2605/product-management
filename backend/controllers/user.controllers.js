const { validationResult } = require("express-validator");
const isEmpty = require("is-empty");

const HttpError = require("../models/http-error");
const User = require("../models/User");

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data!", 422)
    );
  }

  const { userName, password } = req.body;

  let existingUser;
  let newUser;
  let saveUser;

  try {
    existingUser = await User.findOne({ userName: userName });
    if (!isEmpty(existingUser)) {
      const error = new HttpError(
        "User exists already, please login instead",
        422
      );
      return next(error);
    }

    if (
      password.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)
    ) {
      newUser = new User({
        userName,
        password,
      });
      saveUser = await newUser.save();
    }

    if (isEmpty(saveUser)) {
      return next(new HttpError("Can not save the user", 500));
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError("Sign up failed, please try again!", 500);
    return next(error);
  }

  res.status(201).json({ userName: newUser.userName });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data!", 422)
    );
  }

  const { userName, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ userName: userName });
    if (!existingUser) {
      return next(new HttpError("Could not find the user", 404));
    }
  } catch (err) {
    return next(new HttpError("Logging in failed, please try again", 500));
  }

  res.json({
    userName: userName,
    password: password,
  });
};

exports.signup = signup;
exports.login = login;
