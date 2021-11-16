const DB = require("../services/dbConnect");
const { successResponse, errorResponse } = require("../lib/responseHandler");
const User = require("../model/UserModel");
const Permission = require("../model/PermissionModel");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const passport = require("passport");
const jwt = require("jsonwebtoken");
// Self Import
const { JWT_SECRET, DEFAULT_PAGE_SIZE } = require("../../config");
const { MANAGE_ERROR_MESSAGE, CHECK_VALID_PAGE } = require("../lib/helper");
const permissions = require("../data/permissions.json");
const paginateHelper = require("../lib/paginateHelper");

const userDefaultColumns = [
  "id",
  "unique_name",
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
const getPermissionByRoleId = (roleID) => {
  const AdminRoles = Object.keys(permissions) // Oject
    .reduce((current, next) => {
      return [...current, ...permissions[next]]; // return []
    }, []);

  const EmployeeRoles = permissions.EMPLOYEE_PERMISSION;

  switch (roleID) {
    case "1":
      return AdminRoles;
    case "2":
      return EmployeeRoles;
    default:
      return EmployeeRoles;
  }
};

module.exports.GET_ALL_USERS = async (req, res) => {
  try {
    let { query } = req.query;
    query = query ? JSON.parse(query) : {};
    const [userPaginateQuery, userFetch] = [new User(), new User()];

    if (query.id) {
      userPaginateQuery.where({ id: query.id });
      userFetch.where({ id: query.id });
    }

    if (query.unique_name) {
      userPaginateQuery.where({ unique_name: query.unique_name });
      userFetch.where({ unique_name: query.unique_name });
    }

    if (query.user_name) {
      userPaginateQuery.where("user_name", "LIKE", `%${query.user_name}%`);
      userFetch.where("user_name", "LIKE", `%${query.user_name}%`);
    }

    if (query.phone_no) {
      userPaginateQuery.where("phone_no", "LIKE", `%${query.phone_no}%`);
      userFetch.where("phone_no", "LIKE", `%${query.phone_no}%`);
    }

    if (query.role_id) {
      userPaginateQuery.where({ role_id: query.role_id });
      userFetch.where({ role_id: query.role_id });
    }

    const totalUsers = await userPaginateQuery.count();
    const page = CHECK_VALID_PAGE(req.query.page);
    const paginator = paginateHelper({
      page,
      perPage: DEFAULT_PAGE_SIZE,
      totalRows: totalUsers,
    });

    const users = await userFetch.orderBy("id", "DESC").fetchPage({
      withRelated: ["role", "permissions"],
      columns: [...userDefaultColumns],
      page: page,
      pageSize: DEFAULT_PAGE_SIZE,
    });

    res.status(200).json({
      ...successResponse(users),
      pagination: {
        totalCount: totalUsers,
        ...paginator,
      },
    });
  } catch (e) {
    console.log("error", e);
    res.status(401).json(errorResponse(e));
  }
};

module.exports.GET_TOTAL_COUNT = async (req, res) => {
  try {
    const count = await new User().count();
    res.status(200).json(successResponse(count));
  } catch (e) {
    console.log("error", e);
    res.status(401).json(errorResponse(e));
  }
};

module.exports.USER_TOTAL_COUNT = async (req, res) => {
  try {
    const users = await new User().count();
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

      let userId = await DB.knex
        .insert({
          ...req.body,
          password,
        })
        .into("users");

      userId = userId.length === 1 ? userId[0] : 0;

      const permissionList = await new Permission().fetchAll({});
      const permission = getPermissionByRoleId(req.body.role_id);
      const permissionForThisUser = permissionList
        .toJSON()
        .filter((pr) => permission.includes(pr.name));

      await DB.knex
        .insert(
          permissionForThisUser.map((value) => {
            return { permission_id: value.id, user_id: userId };
          })
        )
        .into("permissions_users");

      res.status(200).json(
        successResponse(
          {
            id: userId,
            ...req.body,
            password,
            permissions: permissionForThisUser,
          },
          "Register Successful"
        )
      );
    } catch (e) {
      console.log("errors", e);
      res.status(400).json(errorResponse(e));
    }
  }
};

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
      console.log("errors", e);
      res.status(400).json(errorResponse(e));
    }
  })(req, res);
};

module.exports.UPDATE_USER = async (req, res) => {
  const { error } = await Auth_Update_Validator(req);

  if (error) {
    res.status(400).json(MANAGE_ERROR_MESSAGE(error));
    return;
  }

  res.status(200).json(successResponse("hello"));
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

const Auth_Update_Validator = ({ body }) => {
  const schema = Joi.object().keys({
    user_name: Joi.string().min(3).max(30).required(),
    phone_no: Joi.string().pattern(phRegex).required(),
    address: Joi.string(),
  });
  return schema.validate(body, { abortEarly: false });
};
