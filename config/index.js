const mongoose = require("mongoose");
const { uri } = require("./constants");

const db = mongoose.connect(uri);

module.exports = db;
