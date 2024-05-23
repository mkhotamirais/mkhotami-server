const { err, ok } = require("../helper/utils");
const Kamus = require("../models/kamusModel");

const getKamus = async (req, res) => {
  try {
    let { skip = 0, limit = 10, q = "", sort = "createdAt name" } = req.query;
    let criteria = {};
    if (q.length) criteria = { ...criteria, name: { $regex: `${q}`, $options: "i" } };
    const data = await Kamus.find(criteria).sort(sort).select("-__v").skip(parseInt(skip)).limit(parseInt(limit));
    ok(res, 200, `getKamus`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const getKamusById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Kamus.findById(id);
    if (!data) return err(res, 400, `data id tidak ditemukan`);
    ok(res, 200, `getKamus`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const postKamus = async (req, res) => {
  try {
    const data = await Kamus.create(req.body);
    ok(res, 200, `post ${data.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const updateKamus = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Kamus.findById(id);
    if (!match) return err(res, 400, `data id tidak ditemukan`);
    const data = await Kamus.findByIdAndUpdate(match?._id, req.body, { new: true });
    ok(res, 200, `update ${data.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const deleteKamus = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Kamus.findById(id);
    if (!match) return err(res, 400, `data id tidak ditemukan`);
    const data = await Kamus.findByIdAndDelete(match?._id);
    ok(res, 200, `delete ${data.name} succes`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getKamus, getKamusById, postKamus, updateKamus, deleteKamus };
