const { ok, err, hashPass, comparePass, jwtSign, setCookie, removeCookie } = require("../helper/utils");
const User = require("../models/userModel");
const validator = require("validator");

const getUsers = async (req, res) => {
  try {
    const count = await User.find().countDocuments();
    const data = await User.find().sort("role -createdAt").select(["-__v", "-password"]);
    res.status(200).json({ message: `getUsers`, count, data });
  } catch (error) {
    err(res, 400, error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);
    if (!data) return err(res, 400, `data dengan id ${id} tidak ditemukan`);
    ok(res, 200, `getUserById`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const postUser = async (req, res) => {
  try {
    const { username, email, password, confPassword } = req.body;
    if (!username) return err(res, 400, `username harus diisi`);
    if (!email) return err(res, 400, `email harus diisi`);
    if (!validator.isEmail(email)) return err(res, 400, `email tidak valid`);
    if (!password) return err(res, 400, `password harus diisi`);

    const dup = await User.findOne({ username });
    if (dup) return err(res, 409, `username sudah terdaftar`);
    const dup2 = await User.findOne({ email });
    if (dup2) return err(res, 409, `email sudah terdaftar`);
    if (password.length < 3) return err(res, 400, `panjang password minimal 3 karakter`);
    if (password !== confPassword) return err(res, 400, `konfirmasi password salah`);

    req.body.password = hashPass(password);
    const data = await User.create(req.body);
    ok(res, 210, `post ${data?.username} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!username) return err(res, 400, `username harus diisi`);
    if (!email) return err(res, 400, `email harus diisi`);
    const match = await User.findById(id);
    if (!match) return err(res, 404, `data dengan id ${id} tidak ditemukan`);
    if (req.body.password) {
      if (req.body.password !== req.body.confPassword) return err, `konfirmasi password salah`;
      req.body.password = hashPass(req.body.password);
    }
    const data = await User.findByIdAndUpdate(id, req.body, { new: true });
    ok(res, 200, `update ${match?.username} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await User.findById(id);
    if (!match) return err(res, 400, `data dengan id ${id} tidak ditemukan`);
    const data = await User.findByIdAndDelete(match?._id);
    ok(res, 200, `delete ${data?.username} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

// auth
const signup = async (req, res) => {
  try {
    const { username, email, password, confPassword } = req.body;
    if (!username) return err(res, 400, `username harus diisi`);
    if (!email) return err(res, 400, `email harus diisi`);
    if (!validator.isEmail(email)) return err(res, 400, `email tidak valid`);
    if (!password) return err(res, 400, `password harus diisi`);

    const dup = await User.findOne({ username });
    if (dup) return err(res, 409, `username sudah terdaftar`);
    const dup2 = await User.findOne({ email });
    if (dup2) return err(res, 409, `email sudah terdaftar`);
    if (password.length < 3) return err(res, 400, `panjang password minimal 3 karakter`);
    if (password !== confPassword) return err(res, 400, `konfirmasi password salah`);

    req.body.password = hashPass(password);
    const data = await User.create(req.body);
    ok(res, 210, `post ${data?.username} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) return err(res, 400, `username harus diisi`);
    if (!password) return err(res, 400, `password harus diisi`);

    const match = await User.findOne({ username });
    if (!match) return err(res, 400, `username belum terdaftar`);
    const matchPass = comparePass(password, match.password);
    if (!matchPass) return err(res, 400, `password salah`);

    const token = jwtSign({ id: match?._id, username, role: match?.role });
    setCookie(res, "token", token);
    await User.findByIdAndUpdate(match?._id, { $push: { token } }, { new: true });
    ok(res, 200, "signin success", token);
  } catch (error) {
    err(res, 400, error);
  }
};

const signout = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.userData.id, { $pull: { token: req.cookies.token } }, { new: true });
    removeCookie(res, "token");
    ok(res, 200, `logout ${data?.username} success`);
  } catch (error) {
    err(res, 400, error);
  }
};

const getMe = async (req, res) => {
  try {
    if (!req.userData) return err(res, 401, "anda tidak login");
    const data = await User.findById(req.userData.id).select(["-__v", "-password"]);
    if (!data) return err(res, 401, `data dengan id ${id} tidak ditemukan`);
    ok(res, 200, "get me", data);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getUsers, getUserById, postUser, deleteUser, updateUser, signup, signin, signout, getMe };
