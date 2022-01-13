const { validationResult } = require("express-validator");
const isEmpty = require("is-empty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/User");

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
    }

    const existingPassword = await User.findOne({ password: password });
    if (!isEmpty(existingPassword)) {
      return next(
        new HttpError("Password is taken, please try another password", 403)
      );
    }

    if (
      password.match(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
      )
    ) {
      // hashedPassword = await bcrypt.hash(password, 12);
      // if (isEmpty(hashedPassword)) {
      //   return next(new HttpError("Could not encrypt the password", 422));
      // }
      newUser = new User({
        userName,
        // password: hashedPassword,
        password: password
      });
      saveUser = await newUser.save();
    } else {
      return next(new HttpError("Wrong password!", 422));
    }

    if (isEmpty(saveUser)) {
      return next(new HttpError("Can not save the user", 500));
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
    return next(
      new HttpError("Invalid inputs passed, please check your data!", 422)
    );
  }

  const { userName, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ userName: userName, password: password });
    console.log(existingUser)
    if (isEmpty(existingUser)) {
      return next(new HttpError("Could not find the user", 404));
    }
    // isValidadPassword = await bcrypt.compare(password, existingUser.password);

    // if (!isValidadPassword) {
    //   return next(
    //     new HttpError("Invalid credentials, could not log you in!", 403)
    //   );
    // }
    token = jwt.sign(
      { userName: existingUser.userName },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
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
      token: token,
    });
};

const logout = async (req, res, next) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out!" });
};

exports.signup = signup;
exports.login = login;
exports.logout = logout;
