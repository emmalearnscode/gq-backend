const { body, validationResult } = require("express-validator");

//

const userCreateValidationRules = () => {
  return [
    body("username").isLength({ min: 2 }).isAscii(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }).isAlphanumeric(),
  ];
};

const userLoginValidationRules = () => {
  return [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }).isAlphanumeric(),
  ];
};

const userUpdateValidationRules = (req) => {
  return [
    body("username")
      .optional({ checkFalsy: true })
      .isLength({ min: 2 })
      .isAscii(),
    body("email").optional({ checkFalsy: true }).isEmail(),
    body("password")
      .optional({ checkFalsy: true })
      .isLength({ min: 6 })
      .isAlphanumeric(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userCreateValidationRules,
  userLoginValidationRules,
  userUpdateValidationRules,
  validate,
};
