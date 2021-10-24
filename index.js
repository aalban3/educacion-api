const app = require("./app");
const PORT = process.env.PORT || 9000;
require("dotenv").config();
const mongoose = require("mongoose");

const init = async () => {
  await mongoose.connect("mongodb://localhost:27017/educacion");
  app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
  });
};

init();
