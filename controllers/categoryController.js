const { err, ok } = require("../helper/utils");
const Category = require("../models/categoryModel");

const getCategories = async (req, res) => {
  try {
    const count = await Category.find().countDocuments();
    const data = await Category.find().sort({ createdAt: -1 }).select("-__v");
    res.status(200).json({ message: `getCategories`, count, data });
  } catch (error) {
    err(res, 400, error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findById(id);
    if (!data) return err(res, 404, `data dengan id ${id} tidak ditemukan`);
    ok(res, 200, `getCategoryById`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const postCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name === "") return err(res, 400, `nama kategori harus diisi`);
    const dup = await Category.findOne({ name });
    if (dup) return err(res, 409, `${name} sudah terdaftar, gunakan yang lain`);
    const data = await Category.create(req.body);
    ok(res, 201, `post ${req.body?.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Category.findById(id);
    if (!match) return err(res, 404, `data dengan id ${id} tidak ditemukan`);
    const { name } = req.body;
    const dup = await Category.findOne({ name });
    if (dup && name !== match.name) return err(res, 409, `${name} sudah terdaftar, gunakan yang lain`);
    const data = await Category.findByIdAndUpdate(id, req.body, { new: true });
    ok(res, 200, `update ${match?.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Category.findById(id);
    if (!match) return err(res, 404, `data dengan id ${id} tidak ditemukan`);
    const data = await Category.findByIdAndDelete(id);
    ok(res, 200, `delete ${match?.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getCategories, getCategoryById, postCategory, updateCategory, deleteCategory };
