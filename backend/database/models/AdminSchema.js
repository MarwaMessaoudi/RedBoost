const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  events: {
    type: [String],
    default: [],
  },
});

// Single Admin Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: [
      "superAdmin",
      "CEO",
      "regionalManager",
      "projectEmployee",
      "marcomManager",
      "financialManager",
    ],
  },
  department: String,
  password: {
    type: String,
    unique: true,
    required: true,
  },
  confirmation: {
    type: String,
    unique: true,
    required: true,
  },
  validation: {
    type: Boolean,
    default: false,
  },
  adress: {
    type: String,
    default: "Undefined",
  },
  linkedIn: {
    type: String,
    default: "Undefined",
  },
  behance: {
    type: String,
    default: "Undefined",
  },
  birthday: {
    type: String,
    default: "Undefined",
  },
  exp: {
    type: String,
    default: "0",
  },
  matricule: {
    type: String,
    default: "Undefined",
  },
  cin: {
    type: String,
    default: "Undefined",
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  logs: {
    type: [historySchema],
    default: [],
  },
  bio: {
    type: String,
    default: "Undefined",
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
