const DB = require("../services/dbConnect");
const { successResponse, errorResponse } = require("../lib/responseHandler");
const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const passport = require("passport");
const jwt = require("jsonwebtoken");
// Self Import
const { JWT_SECRET } = require("../../config");
const { MANAGE_ERROR_MESSAGE } = require("../lib/helper");

const userDefaultColumns = [
  "id",
  "user_name",
  "role_id",
  "phone_no",
  "note",
  "address",
  "profile_picture",
];

/**
 * User Lists
 */

module.exports.GET_ALL_USERS = async (req, res) => {
  try {
    const users = await new User().fetchAll({
      withRelated: ["role", "permissions"],
      columns: [...userDefaultColumns],
    });
    res.status(200).json(successResponse(users));
  } catch (e) {
    console.log("error", e);
    res.status(401).json(errorResponse(e));
  }
};

module.exports.GET_USER_BY_ID = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await new User({ id }).fetch({
      withRelated: ["role", "permissions"],
      columns: [...userDefaultColumns],
    });
    res.status(200).json(successResponse(users));
  } catch (e) {
    console.log("error", e);
    res.status(401).json(errorResponse(e));
  }
};

module.exports.GET_ME = async (req, res) => {
  try {
    const { user } = req;
    const users = await new User({ id: user.id }).fetch({
      withRelated: ["role", "permissions"],
      columns: [...userDefaultColumns],
    });
    res.status(200).json(successResponse(users));
  } catch (e) {
    console.log("error", e);
    res.status(401).json(errorResponse(e));
  }
};

/**
 * CREATE USER
 */

module.exports.CREATE_USER = async (req, res) => {
  const { error } = await Auth_Register_Validator(req);
  if (error) {
    res.status(400).json(MANAGE_ERROR_MESSAGE(error));
    return;
  }
  try {
    const isExistUser = await User.where({
      unique_name: req.body.unique_name,
    }).fetch({
      require: true,
      withRelated: ["role", "permissions"],
      columns: [...userDefaultColumns],
    });

    if (isExistUser) {
      res
        .status(400)
        .json(errorResponse(new Error("Your account is Already Registered")));
    }
  } catch (e) {
    try {
      // If Not Exist
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const userId = await DB.knex
        .insert({
          ...req.body,
          password,
        })
        .returning("id")
        .into("users");

      console.log("userId", userId);

      res.status(200).json(
        successResponse(
          {
            id: userId.length === 1 ? userId[0] : 0,
            ...req.body,
            password,
          },
          "Register Successful"
        )
      );
    } catch (e) {
      res.status(400).json(errorResponse(e));
    }
  }
};

/**
 * Login User
 */

module.exports.LOGIN_USER = async (req, res) => {
  const { error } = await Auth_Login_Validator(req);

  if (error) {
    res.status(400).json(MANAGE_ERROR_MESSAGE(error));
    return;
  }

  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json(errorResponse(err));
    }

    try {
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.status(400).json(errorResponse(err));
        }
        // Set JWT Token
        const token = jwt.sign(user, JWT_SECRET);
        return res.json({ ...successResponse(user), token });
      });
    } catch (e) {
      console.log(e);
      res.status(400).json(errorResponse(e));
    }
  })(req, res);
};

/**
 * All Validator Here
 */

const phRegex = new RegExp("(?=^(09))([0-9]{6,11})$|(?=^(01))([0-9]{6,8})$");
const Auth_Register_Validator = ({ body }) => {
  const schema = Joi.object().keys({
    unique_name: Joi.string().min(3).max(30).required(),
    user_name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    phone_no: Joi.string().pattern(phRegex).required(),
    address: Joi.string(),
    role_id: Joi.string().required(),
  });
  return schema.validate(body, { abortEarly: false });
};
const Auth_Login_Validator = ({ body }) => {
  const schema = Joi.object().keys({
    unique_name: Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
  });
  return schema.validate(body, { abortEarly: false });
};
