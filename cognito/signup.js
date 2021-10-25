const AWS = require("aws-sdk");
const { generateHash } = require("./authUtils");

require("dotenv").config();

const config = {
  region: "us-east-1",
};

const signUp = async (userName, password) => {
  try {
    const userAttr = [
      {
        Name: "email",
        Value: userName,
      },
    ];
    // console.log(password);
    console.log(userName);

    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Password: password,
      Username: userName,
      SecretHash: generateHash(userName),
      UserAttributes: userAttr,
    };

    const cognitoIdentity = new AWS.CognitoIdentityServiceProvider(config);
    const data = await cognitoIdentity.signUp(params).promise();

    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = signUp;
