const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Tag = require("../models/tagModel");
const { extname, join } = require("path");
const { existsSync, unlinkSync, renameSync } = require("fs");
const { root } = require("../config/constants");
const { err, ok } = require("../helper/utils");

const getProducts = async (req, res) => {
  try {
    let { skip = 0, limit = 0, q = "", category = "", tag = [] } = req.query;
    let criteria = {};
    if (q.length) criteria = { ...criteria, name: { $regex: `${q}`, $options: "i" } };
    if (category.length) criteria = { ...criteria, category };
    if (tag.length) criteria = { ...criteria, tags: { $in: tag } };
    const count = await Product.find().countDocuments();
    const countCriteria = await Product.find(criteria).countDocuments();
    const data = await Product.find(criteria)
      .sort({ createdAt: -1 })
      .select("-__v")
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate({ path: "tags", select: ["_id", "name"] })
      .populate({ path: "category", select: ["_id", "name"] });
    res.status(200).json({ message: `getProducts`, count, countCriteria, data });
  } catch (error) {
    err(res, 400, error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id)
      .select("-__v")
      .populate({ path: "tags", select: ["_id", "name"] })
      .populate({ path: "category", select: ["_id", "name"] });
    if (!data) return err(res, 404, `data dengan id ${id} tidak ditemukan`);
    ok(res, 200, "getProductById", data);
  } catch (error) {
    err(res, 400, error);
  }
};

const postProduct = async (req, res) => {
  if (req.body.category) {
    const category = await Category.findById(req.body.category);
    category ? (req.body.category = category) : err(res, 404, `category dengan id ${req.body.category} tidak ditemukan`);
  }
  if (req.body.tags && req.body.tags.length > 0) {
    const tags = await Tag.find({ _id: { $in: req.body.tags } });
    if (tags.length === 0) return err(res, 404, `tidak ada tag yang cocok`);
    if (tags.length < req.body.tags.length) return err(res, 404, `salah satu tag tidak ditemukan`);
  }
  if (req.file) {
    const { originalname, filename, path, size } = req.file;
    const validExt = [".jpg", ".jpeg", ".png"];
    const ext = extname(originalname);
    if (!validExt.includes(ext)) {
      if (existsSync(path)) unlinkSync(path);
      return err(res, 400, `ekstensi tidak valid`);
    } else if (size > 2000000) {
      if (existsSync(path)) unlinkSync(path);
      return err(res, 400, `file max 2mb`);
    }
    req.body.imageName = filename + ext;
    req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/${filename + ext}`;
    try {
      const data = await Product.create(req.body);
      if (existsSync(path)) renameSync(path, path + ext);
      ok(res, 201, `post ${data?.name} success`, data);
    } catch (error) {
      if (existsSync(path + ext)) unlinkSync(pathFile + ext);
      if (existsSync(path)) unlinkSync(path);
      err(res, 400, error);
    }
  } else {
    try {
      const data = await Product.create(req.body);
      ok(res, 201, `post ${data?.name} success`, data);
    } catch (error) {
      err(res, 400, error);
    }
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (req.body.category) {
    const category = await Category.findById(req.body.category);
    category ? (req.body.category = category) : err(res, 404, `category dengan id ${req.body.category} tidak ditemukan`);
  }
  if (req.body.tags && req.body.tags.length > 0) {
    const tags = await Tag.find({ _id: { $in: req.body.tags } });
    if (tags.length === 0) return err(res, 404, `tidak ada tag yang cocok`);
    if (tags.length < req.body.tags.length) return err(res, 404, `salah satu tag tidak ditemukan`);
  }
  if (req.file) {
    const match = await Product.findById(id);
    const { originalname, filename, path, size } = req.file;
    const validExt = [".jpg", ".jpeg", ".png"];
    const ext = extname(originalname);
    if (!match) {
      if (existsSync(path)) unlinkSync(path);
      return err(res, 404, `data dengan id ${id} tidak ditemukan`);
    }
    if (!validExt.includes(ext)) {
      if (existsSync(path)) unlinkSync(path);
      return err(res, 400, `ekstensi tidak valid`);
    } else if (size > 2000000) {
      if (existsSync(path)) unlinkSync(path);
      return err(res, 400, `file max 2mb`);
    }
    req.body.imageName = filename + ext;
    req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/${filename + ext}`;
    try {
      const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
      const prevImagePath = join(root, "public/images", `${match.imageName}`);
      const newImagePath = join(root, "public/images", `${data.imageName}`);
      if (existsSync(prevImagePath)) unlinkSync(prevImagePath);
      renameSync(path, newImagePath);
      ok(res, 200, `update ${match?.name} success`, data);
    } catch (error) {
      if (existsSync(path + ext)) unlinkSync(path + ext);
      if (existsSync(path)) unlinkSync(path);
      err(res, 400, error);
    }
  } else {
    try {
      const match = await Product.findById(id);
      if (!match) return err(res, 404, `data dengan id ${id} tidak ditemukan`);
      const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
      ok(res, 200, `update ${match?.name} success`, data);
    } catch (error) {
      err(res, 400, error);
    }
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (!data) return err(res, 404, `data dengan id ${id} tidak ditemukan`);
    const path = join(root, "public/images", `${data.imageName}`);
    if (existsSync(path)) unlinkSync(path);
    await Product.findByIdAndDelete(id);
    ok(res, 200, `delete ${data?.name} success`);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getProductById, getProducts, postProduct, deleteProduct, updateProduct };
