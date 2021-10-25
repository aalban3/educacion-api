const {
  db,
  models: { User },
} = require("../db");
const mongoose = require("mongoose");

const seedDB = async () => {
  try {
    const new_user = new User({
      email: "miu@email.com",
      password: "12345",
    });

    // save model to database
    await new_user.save();

    console.log("DONE!");
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
};

seedDB();
