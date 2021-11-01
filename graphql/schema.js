const { buildSchema } = require("graphql");
const {
  models: { User },
} = require("../db");
const authResolvers = require("../utils/authUtils");

const typeDefs = buildSchema(`
  type User {
    _id: ID!
    email: String!
    verified: Boolean!
  }
  type Auth {
    token: String!
  }
  type Query {
    users: [User]
  }
  type Mutation {
    login(email: String, password: String): User
    signup(email: String, password: String): Boolean!
    verify(email: String, code: String): Boolean!
  }
`);

const mutations = {
  ...authResolvers,
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
