const {
  getCategories,
  postCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { verifyToken, verifyAdmin } = require("../helper/middleware");

const router = require("express").Router();

router.route("/").get(getCategories).post(verifyToken, verifyAdmin, postCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .patch(verifyToken, verifyAdmin, updateCategory)
  .delete(verifyToken, verifyAdmin, deleteCategory);

module.exports = router;
