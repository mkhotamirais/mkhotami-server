require("dotenv").config();
const { resolve } = require("path");

const root = resolve(__dirname, "..");
const { PORT: port, MONGO_URI: uri, ACCESS_TOKEN: at } = process.env;

module.exports = { port, uri, at, root };
