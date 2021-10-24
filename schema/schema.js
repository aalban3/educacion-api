var { buildSchema } = require("graphql");

const typeDefs = buildSchema(`
  type User {
    id: ID!
    email: String!
    password: String!
  }
  type Auth {
    token: String!
  }
  type Query {
    users: [User]
  }
  type Mutation {
    login(email: String, password: String): Auth
    signup(email: String, password: String): Auth
  }
`);

const resolvers = {
  login: async (email, password) => {
    // do some token magic
    return { token: "you're logged in" };
  },
  signup: async (email, password) => {
    return null;
  },
};

module.exports = {
  types: typeDefs,
  resolvers,
};
