const express = require("express");
const app = express();
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();
var cors = require("cors");
// const logger = require("morgan");
const { types, resolvers } = require("./graphql/schema");

app.use(cors());
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: types,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.get("/", function (req, res, next) {
  res.send("Hello, Nothing to see here yet!");
});
// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    res.status(404);
    next(err);
  } else {
    next();
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = app;
