const DB = require("../services/dbConnect");
const { successResponse, errorResponse } = require("../lib/responseHandler");
const User = require("../model/UserModel");
const UserLog = require("../model/UserLogModel");
const Permission = require("../model/PermissionModel");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const passport = require("passport");
const jwt = require("jsonwebtoken");
// Self Import
const { JWT_SECRET, DEFAULT_PAGE_SIZE, TABLE } = require("../../config");
const { MANAGE_ERROR_MESSAGE, CHECK_VALID_PAGE } = require("../lib/helper");
const permissions = require("../data/permissions.json");
const paginateHelper = require("../lib/paginateHelper");

const userActionTypes = {
  CREATE_USER: "CREATE_USER",
  SELF_REGISTER: "SELF_REGISTER",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",
};

const USER_TABLE = TABLE.USER_TABLE;

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

const Log = {
  UserCreate: async ({ authUser, objectUser }) => {
    const message = `${objectUser.user_name} [#${objectUser.id}] is created by ${authUser.user_name} [#${authUser.id}]`;
    return new UserLog({
      user_id: authUser.id,
      user_name: authUser.user_name,
      object_id: objectUser.id,
      object_name: objectUser.user_name,
      action_type: userActionTypes.CREATE_USER,
      table_name: USER_TABLE,
      message: message,
      attachment: JSON.stringify({
        message,
        data: [],
      }),
    }).save();
  },
  UserDeleted: async ({ authUser, objectUser }) => {
    const message = `${objectUser.user_name} [#${objectUser.id}] is deleted by ${authUser.user_name} [#${authUser.id}]`;
    return new UserLog({
      user_id: authUser.id,
      user_name: authUser.user_name,
      object_id: objectUser.id,
      object_name: objectUser.user_name,
      action_type: userActionTypes.DELETE_USER,
      table_name: USER_TABLE,
      message: message,
      attachment: JSON.stringify({
        message,
        data: [],
      }),
    }).save();
  },
  UserUpdate: async ({ authUser, objectUser, body }) => {
    const isUpdateSelf = authUser.id === objectUser.id;
    const toCheckKeys = ["phone_no", "unique_name", "user_name"];
    const changesData = toCheckKeys.reduce((cur, key) => {
      const updateObj = {
        fieldName: key,
        oldValue: objectUser[key],
        newValue: body[key],
      };

      return objectUser[key] !== body[key] ? [...cur, updateObj] : [...cur];
    }, []);
    // phone_no [0999] to [08888],
    const updateDataMessage = changesData
      .map(
        (data) => `${data.fieldName} : [${data.oldValue}]to[${data.newValue}] `
      )
      .join(", ");

    const message = isUpdateSelf
      ? `${objectUser.user_name} [#${objectUser.id}] is update by himself/herself`
      : `${objectUser.user_name} [#${objectUser.id}] is updated by ${authUser.user_name} [#${authUser.id}]`;

    const logData = {
      user_id: authUser.id,
      user_name: authUser.user_name,
      object_id: objectUser.id,
      object_name: objectUser.user_name,
      action_type: userActionTypes.UPDATE_USER,
      table_name: USER_TABLE,
      message: message,
      attachment: JSON.stringify({
        message,
        updateDataMessage,
        data: changesData,
      }),
    };
    return new UserLog(logData).save();
  },
};

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
  const { user: authUser } = req; // Auth User
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
        .into(USER_TABLE);

      userId = userId.length === 1 ? userId[0] : 0;
      await Log.UserCreate({
        authUser,
        objectUser: {
          id: userId,
          user_name: req.body.user_name,
        },
      });

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

module.exports.UPDATE_USER = async (req, res) => {
  console.log("Udate User Function Start..");
  const { user: authUser } = req; // Auth User
  const { error } = await Auth_Update_Validator(req);
  const { id } = req.params;
  if (error) {
    res.status(400).json(MANAGE_ERROR_MESSAGE(error));
    return;
  }

  try {
    const existingUser = await User.where({
      id,
    }).fetch({
      require: true,
      withRelated: ["role", "permissions"],
      columns: [...userDefaultColumns],
    });

    // Need To Check
    const isNeedCheckUniqueName =
      existingUser.toJSON().unique_name !== req.body.unique_name;

    // console.log("isNeedCheckUniqueName", isNeedCheckUniqueName);

    if (isNeedCheckUniqueName) {
      // console.log("Inside Need to check");
      const isAlreadyRegistered = await User.where({
        unique_name: req.body.unique_name,
      })
        .fetch({
          require: true,
          withRelated: ["role", "permissions"],
          columns: [...userDefaultColumns],
        })
        .catch((e) => console.log(e.message));

      if (isAlreadyRegistered) {
        // console.log("isAlreadyRegistered", isAlreadyRegistered.toJSON());
        return res
          .status(400)
          .json(errorResponse(new Error("Unique Name is Already Registered")));
      }
    }

    // After Checking UniqueName
    const objectUser = { ...existingUser.toJSON() };
    // console.log("After checking... Unqiue Name");
    const updateUser = await existingUser.save(req.body);
    // console.log("Updating.. Request Body");
    await Log.UserUpdate({
      authUser,
      objectUser,
      body: req.body,
    });

    return res.status(200).json(successResponse(updateUser.toJSON()));
  } catch (e) {
    console.log("errors", e);
    res.status(400).json(errorResponse(e));
  }
};

module.exports.DELETE_USER = async (req, res) => {
  const { id } = req.params;
  const { user: authUser } = req;
  try {
    const existingUser = await User.where({
      id,
    }).fetch({
      require: true,
      withRelated: ["role", "permissions"],
      columns: [...userDefaultColumns],
    });

    if (existingUser) {
      await new User({ id }).destroy({ hardDelete: true });
      await Log.UserDeleted({ authUser, objectUser: existingUser.toJSON() });
      return res.status(200).json(successResponse(existingUser.toJSON()));
    } else {
      return res.status(400).json(errorResponse(new Error("Not Found User.")));
    }
  } catch (e) {
    res.status(400).json(errorResponse(e));
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

/**
 * All Validator Here
 */

const phRegex = new RegExp("(?=^(09))([0-9]{6,11})$|(?=^(01))([0-9]{6,8})$");
const Auth_Register_Validator = ({ body }) => {
  const schema = Joi.object().keys({
    unique_name: Joi.string().min(3).max(30).required(),
    user_name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    phone_no: Joi.string().pattern(phRegex).required().error(phErrorHandler),
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
    unique_name: Joi.string().min(3).max(30).required(),
    user_name: Joi.string().min(3).max(30).required(),
    phone_no: Joi.string().pattern(phRegex).required().error(phErrorHandler),
    address: Joi.string(),
  });
  return schema.validate(body, { abortEarly: false });
};
function phErrorHandler(errors) {
  errors.forEach((err) => {
    switch (err.code) {
      case "any.empty":
        err.message = "Phone Number should not be empty!";
        break;
      case "string.pattern.base":
        err.message = `Phone Number is not valid.`;
        break;
      default:
        break;
    }
  });
  return errors;
}
