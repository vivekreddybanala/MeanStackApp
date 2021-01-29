const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let employees = new Schema(
  {
    _id: Number,
    name: String,
    salary: Number,
    designation: String,
    joiningDate: String,
    type: String
  },
  { collection: "employees" }
);

module.exports = mongoose.model("employees", employees);
