// middleware/validate.js

const { check, validationResult } = require("express-validator");
const validator = require("validator");

const validateSignup = [
  check("email").isEmail().withMessage("Please enter a valid email"),
  check("mobile").custom((value) => {
    if (!validator.isMobilePhone(value, "any")) {
      throw new Error("Mobile number is not valid");
    }
    return true;
  }),
  check("name").not().isEmpty().withMessage("Name is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

const validateReset = [
  check("email").isEmail().withMessage("Please enter a valid email"),
  check("oldPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  check("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  check("email").isEmail().withMessage("Please enter a valid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUpdate = [
  check("mobile").custom((value) => {
    if (!validator.isMobilePhone(value, "any")) {
      throw new Error("Mobile number is not valid");
    }
    return true;
  }),
  check("name").not().isEmpty().withMessage("Name is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateSignup,
  validateLogin,
  validateReset,
  validateUpdate,
};
