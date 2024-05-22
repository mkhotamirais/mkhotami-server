const { err, ok, hashPass, comparePass, jwtSign, setCookie, removeCookie } = require("../helper/utils");
const User = require("../models/userModel");

const signup = async (req, res) => {
  try {
    const { password, confPassword } = req.body;
    if (password !== confPassword) return err(res, 400, `konfirmasi password salah`);
    req.body.password = hashPass(password);
    const data = await User.create(req.body);
    ok(res, 201, `register ${data?.username} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) return err(res, 400, `username harus diisi`);
    if (!password) return err(res, 400, `passowrd harus diisi`);
    const match = await User.findOne({ username });
    if (!match) return err(res, 400, `username tidak ditemukan`);
    const matchPass = comparePass(password, match.password);
    if (!matchPass) return err(res, 400, `password salah`);
    const accessToken = jwtSign({ id: match?._id, username, role: match?.role }, "access");
    setCookie(res, "accessToken", accessToken);
    await User.findByIdAndUpdate(match?._id, { $push: { token: accessToken } });
    ok(res, 200, `signin ${match?.username} success`, accessToken);
  } catch (error) {
    err(res, 400, error);
  }
};

const signout = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.userData.id, { $pull: { token: req.token } }, { new: true });
    removeCookie(res, "accessToken");
    ok(res, 200, `logout ${data?.username} success`);
  } catch (error) {
    err(res, 400, error);
  }
};

const getMe = async (req, res) => {
  try {
    // const data = await User.findById(req.userData.id).select(["-__v", "-password", "-token"]);
    const data = await User.findOne({ token: { $in: req.token } }).select(["-__v", "-password", "-token"]);
    ok(res, 200, `getMe`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const updateMe = async (req, res) => {
  try {
    const match = await User.findById(req.userData.id);
    if (req.body.password) {
      if (req.body.password !== req.body.confPassword) return err(res, 400, `konfirmasi passwor salah`);
      req.body.pasword = hashPass(req.body.password);
    }
    if (match.role === "user") req.body.role = "user";
    const data = await User.findByIdAndUpdate(req.userData.id, req.body, { new: true });
    ok(res, 200, `update ${req.userData?.username} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const deleteMe = async (req, res) => {
  try {
    const match = await User.findById(req.userData.id);
    if (match.role === "admin") return err(res, 400, `role admin tidak bisa dihapus, ubah dulu rolenya`);
    await User.findByIdAndDelete(match?._idid);
    ok(res, 200, `akun anda berhasil dihapus`);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { signup, signin, signout, getMe, updateMe, deleteMe };
