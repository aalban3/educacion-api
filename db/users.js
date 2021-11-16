const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    cognitoToken: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("users", userSchema);

module.exports = User;
