/**
 * Passport is authentication middleware for Node.
 * @doc : http://www.passportjs.org/docs/
 */
// const User = require("../src/User/UserModel");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/UserModel");
const config = require("../../config");
const bcrypt = require("bcrypt");

/**
 * This module lets you authenticate endpoints using a JSON web token.
 * It is intended to be used to secure RESTful endpoints without sessions.
 * @doc : https://www.npmjs.com/package/passport-jwt
 */
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = (passport) => {
  const JWT_MANAGE = async function (jwtPayload, cb) {
    return jwtPayload.id
      ? cb(null, jwtPayload)
      : cb(new Error("Not Valid User Authenticate"), null, {
          message: "Not Valid User Authenticate",
        });
  };

  const PassportJWTStrategy = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
  };

  passport.use(new JWTStrategy(PassportJWTStrategy, JWT_MANAGE));

  /**
   * This module lets you authenticate using a username
   * and password in your Node.js applications
   * @doc : http://www.passportjs.org/packages/passport-local/
   */

  const PassportLocalStrategy = {
    usernameField: "unique_name",
    passwordField: "password",
  };

  /**
   * @desc: When User Login ( Authentication )
   * @route 'api/v{number}/auth'
   * @method POST
   */
  const PassportManage = async (unique_name, password, cb) => {
    try {
      const user = (
        await new User({ unique_name }).fetch({
          withRelated: ["role", "permissions"],
        })
      ).toJSON();

      if (!user) return cb(new Error("Not Found User"), false);

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;

        // console.log("password, user.password", password, user.password);
        if (isMatch) {
          return cb(null, user);
        } else {
          return cb(new Error("Incorrect Password"), false);
        }
      });
    } catch (e) {
      console.log(e);
      cb(new Error("Incorrect name or password."), false);
    }
  };

  passport.use(new LocalStrategy(PassportLocalStrategy, PassportManage));
};
