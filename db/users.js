const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    cognitoToken: { type: String, required: true },
    verified: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("users", userSchema);

module.exports = User;
