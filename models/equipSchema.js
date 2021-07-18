"use strict";

const mongoose = require("mongoose");

const equipSchema = new mongoose.Schema({
    name: String,
    price: String,
    quantity: Number,
    image_url: String,
});

module.exports = equipSchema;