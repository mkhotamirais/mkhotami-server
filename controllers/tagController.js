const { err, ok } = require("../helper/utils");
const Tag = require("../models/tagModel");

const getTags = async (req, res) => {
  try {
    const count = await Tag.find().countDocuments();
    const data = await Tag.find().select("-__v").sort({ createdAt: -1 });
    res.status(200).json({ message: `getTags`, count, data });
  } catch (error) {
    err(res, 400, error);
  }
};

const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Tag.findById(id);
    if (!data) return err(res, 400, `data dengan id ${id} tidak ditemukan`);
    ok(res, 200, `getTagById`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const postTag = async (req, res) => {
  try {
    const data = await Tag.create(req.body);
    ok(res, 201, `post ${data?.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Tag.findById(id);
    if (!match) return err(res, 400, `data dengan id ${id} tidak ditemukan`);
    const data = await Tag.findByIdAndUpdate(match?._id, req.body, { new: true });
    ok(res, 200, `update ${data?.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Tag.findById(id);
    if (!match) return err(res, 400, `data dengan id ${id} tidak ditemukan`);
    const data = await Tag.findByIdAndDelete(match?._id);
    ok(res, 200, `delete ${data?.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getTags, getTagById, postTag, updateTag, deleteTag };
