const { buildSchema } = require("graphql");
const {
  models: { User },
} = require("../db");
const signUp = require("../cognito/signup");
const verify = require("../cognito/verify");

const typeDefs = buildSchema(`
  type User {
    _id: ID!
    email: String!
    password: String!
    createdAt: String!
    cognitoToken: String!
  }
  type Auth {
    token: String!
  }
  type Query {
    users: [User]
  }
  type Mutation {
    login(email: String, password: String): User
    signup(email: String, password: String): Auth
    verify(email: String, code: String): Boolean!
  }
`);

const mutations = {
  login: async (req, resp) => {
    // do some token magic
    return { token: "you're logged in" };
  },
  signup: async (req, resp) => {
    try {
      const { email, password } = req;
      const res = await signUp(email, password); // sign user up using cognito

      if (res) {
        const new_user = new User({
          email: email,
          password: password,
          cognitoToken: res.UserSub,
        });

        // save model to database
        await new_user.save();
      }

      return { token: res.UserSub };
    } catch (error) {
      throw error;
    }
  },
  verify: async (req, resp) => {
    try {
      const { email, code } = req;
      const res = await verify(email, code);
      if (res) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },
};

const queries = {
  users: () => {
    return User.find({});
  },
};

const resolvers = { ...queries, ...mutations };
module.exports = {
  types: typeDefs,
  resolvers,
};
