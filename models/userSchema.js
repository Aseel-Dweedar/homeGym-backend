"use strict";

const mongoose = require("mongoose");
const equipSchema = require("./equipSchema");

const userSchema = new mongoose.Schema({
    email: String,
    equipment: [equipSchema],
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;