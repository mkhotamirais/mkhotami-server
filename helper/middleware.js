const { at } = require("../config/constants");
const { err } = require("./utils");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = (req, res, next) => {
  // const authHeader = req.headers.authorization || req.headers.authorization;
  // if (!authHeader?.startsWith("Bearer ")) return err(res, 401, `unauthorized: anda tidak login`);
  // const token = authHeader.split(" ")[1];
  const token = req.cookies.accessToken;
  jwt.verify(token, at, (error, decoded) => {
    if (error) return err(res, 403, `forbidden: token tidak valid`);
    req.userData = decoded;
    req.token = token;
    next();
  });
};

const verifyAdmin = async (req, res, next) => {
  const data = await User.findById(req?.userData?.id);
  if (data.role !== "admin") return err(res, 403, `forbidden: hanya admin yang bisa akses`);
  next();
};

module.exports = { verifyToken, verifyAdmin };
