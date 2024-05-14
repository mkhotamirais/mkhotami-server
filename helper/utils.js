const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const multer = require("multer");
const path = require("path");
const { root } = require("../config/constants");
const jwt = require("jsonwebtoken");

// ok 200, created 201, no content 204
// bad request 400, unauthorized 401, forbidden 403, conflict 409
// internal server error 500

const ok = (res, status, message, data) => {
  res.status(status).json({ message, data });
};

const err = (res, status, error) => {
  res.status(status).json({ message: error?.message || error });
};

// const upload = multer({ dest: path.join(root, "public/images/product") }).single("image");

// const hashPass = (pass) => {
//   const salt = genSaltSync(10);
//   const hash = hashSync(pass, salt);
//   return hash;
// };

// const comparePass = (pass, oldPass) => {
//   return compareSync(pass, oldPass);
// };

// const jwtSign = (data) => {
//   return jwt.sign(data, token, { expiresIn: "1d" });
// };

// const setCookie = (res, name, token) => {
//   res.cookie(`${name}`, token, {
//     httpOnly: true,
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     secure: "auto",
//     sameSite: "None",
//   });
// };

// const removeCookie = (res, name) => {
//   res.clearCookie(`${name}`, {
//     httpOnly: true,
//     sameSite: "None",
//     secure: "auto",
//     // expires: new Date(0)
//   });
// };

// module.exports = { ok, err, hashPass, upload, comparePass, jwtSign, setCookie, removeCookie };
module.exports = { ok, err };
