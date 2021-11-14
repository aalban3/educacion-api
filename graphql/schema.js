const { buildSchema } = require("graphql");
const {
  models: { User },
} = require("../db");
const signUp = require("../cognito/signup");
const verify = require("../cognito/verify");
const logIn = require("../cognito/login");
const deliveryClient = require("../kontent");
const { articulo } = require("./articulo");
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
  ${articulo}
  type Query {
    users: [User]
    kontent(type: String, subtype: String): Articulo
    allKontent(type: String): [Articulo]
  }
  type Mutation {
    login(email: String, password: String): User
    signup(email: String, password: String): Auth
    verify(email: String, code: String): Boolean!
  }
`);

const mutations = {
  login: async (req, resp) => {
    try {
      const { email, password } = req;
      const res = await logIn(email, password);

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
  kontent: async (req, res) => {
    // returns kontent data by type and subcategory
    const { type, subtype } = req;
    const { items } = await deliveryClient.items().type(type).toPromise();
    const article = items.find((a) => a.system.name === subtype);
    return { ...article, category: article.system.name };
  },
  allKontent: async (req, res) => {
    const { type } = req;
    const { items } = await deliveryClient.items().type(type).toPromise();
    return items.map((a) => ({ ...a, category: a.system.name }));
  },
};

const resolvers = { ...queries, ...mutations };
module.exports = {
  types: typeDefs,
  resolvers,
};
