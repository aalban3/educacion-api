const app = require("./app");
const PORT = process.env.PORT || 9000;
require("dotenv").config();
const { db } = require("./db");

const init = async () => {
  await db;
  console.log("connected to Mongo");
  app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
  });
};

init();
