const AWS = require("aws-sdk");
const crypto = require("crypto");
require("dotenv").config();

const generateHash = (userName) => {
  return crypto
    .createHmac("SHA256", process.env.COGNITO_CLIENT_SECRET)
    .update(userName + process.env.COGNITO_CLIENT_ID)
    .digest("base64");
};

module.exports = {
  generateHash,
};
