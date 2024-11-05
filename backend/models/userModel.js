const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "user must have a name"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },

  /* photo: {
    type: String,
    default: process.env.DEFAULT_PROFILE_PIC,
  }, */

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },



});
userSchema.methods.correctPassword = async (candidatePassword, userPassword) => await bcrypt.compare(candidatePassword, userPassword);

const User = mongoose.model("User", userSchema);
module.exports = User;