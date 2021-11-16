const User = require("./users");
const mongoose = require("mongoose");
require("dotenv").config();
const db = mongoose.connect(process.env.MONGODB_URL);

module.exports = {
  db,
  models: {
    User,
  },
};
