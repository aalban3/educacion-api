const AWS = require("aws-sdk");
const { generateHash } = require("./authUtils");

require("dotenv").config();

const config = {
  region: "us-east-1",
};

const verify = async (userName, code) => {
  try {
    const cognitoIdentity = new AWS.CognitoIdentityServiceProvider(config);
    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: userName,
      SecretHash: generateHash(userName),
      ConfirmationCode: code,
    };

    const data = await cognitoIdentity.confirmSignUp(params).promise();

    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = verify;
