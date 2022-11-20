import "./db";
import mongoose from "mongoose";
const Users = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vilage: {
    type: String,
    required: true,
  },
  pageno: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
mongoose.models = {};
module.exports = mongoose.model("Users", Users);
