const AWS = require("aws-sdk");
const { generateHash } = require("./authUtils");

require("dotenv").config();

const config = {
  region: "us-east-1",
};

const logIn = async (userName, password) => {
  try {
    const cognitoIdentity = new AWS.CognitoIdentityServiceProvider(config);

    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: userName,
        PASSWORD: password,
        SECRET_HASH: generateHash(userName),
      },
    };

    const data = await cognitoIdentity.initiateAuth(params).promise();

    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = logIn;
