const jwt = require("jsonwebtoken");
const { err } = require("./utils");
const { ats } = require("../config/constants");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  // cara 1
  // const authHeader = req.headers.authorization || req.headers.Authorization;
  // if (!authHeader?.startsWith("Bearer ")) return err(res, 401, "token tidak ada");
  // const token = authHeader.split(" ")[1];
  // cara 2
  const token = req.cookies.accessToken;
  // dari cara 1 atau cara 2 lanjut ke sini
  const match = await User.findOne({ token });
  if (!match) return err(res, 401, "token tidak cocok");
  jwt.verify(token, ats, (error, decoded) => {
    if (error) return err(res, 403, "forbidden");
    req.me = decoded;
    req.token = token;
    next();
  });
};

const verifyAdmin = async (req, res, next) => {
  const data = await User.findById(req.userData.id);
  if (!data) return err(res, 403, `forbidden: hanya admin yang bisa akses`);
  next();
};

module.exports = { verifyToken, verifyAdmin };
