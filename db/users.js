const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model("User", userSchema);

const silence = new User({ name: "Silence" });
silence.save(() => {
  console.log("Done");
});
module.exports = User;
