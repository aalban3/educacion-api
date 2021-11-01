const {
  models: { User },
} = require("../db");
const signUp = require("../cognito/signup");
const verify = require("../cognito/verify");
const logIn = require("../cognito/login");

const authResolvers = {
  login: async (req, resp) => {
    try {
      const { email, password } = req;
      const res = await logIn(email, password);
      console.log(res);
      if (res) {
        const loggedInUser = User.findOne({
          email,
        });

        return loggedInUser;
      }

      throw new Error("No User Found");
    } catch (error) {
      throw error;
    }
  },
  signup: async (req, resp) => {
    try {
      const { email, password } = req;
      const res = await signUp(email, password); // sign user up using cognito

      if (res) {
        const new_user = new User({
          email: email,
          cognitoToken: res.UserSub,
          verified: false,
        });
        // save model to database
        await new_user.save();
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  },
  verify: async (req, resp) => {
    try {
      const { email, code } = req;
      const res = await verify(email, code);
      console.log(res);
      if (res) {
        return true;
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = authResolvers;
