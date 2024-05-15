const { ok, err } = require("../helper/utils");
const User = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const data = await User.find();
    ok(res, 200, `getUsers`, data);
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
    const data = await User.create(req.body);
    ok(res, 210, `post ${data?.username} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getUsers, getUserById, postUser };
