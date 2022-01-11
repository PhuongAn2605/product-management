const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/user.controllers");

const router = express.Router();

router.post(
  "/signup",
  [
    check("userName").not().isEmpty(),
    check("password").isLength({ min: 8, max: 15 }),
  ],
  userControllers.signup
);

router.post(
    "/login",
    [
      check("userName").not().isEmpty(),
      check("password").isLength({ min: 8, max: 15 }),
    ],
    userControllers.login
  );

module.exports = router;
