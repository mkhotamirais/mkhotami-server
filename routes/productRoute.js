const {
  getProductById,
  updateProduct,
  deleteProduct,
  getProducts,
  postProduct,
} = require("../controllers/productController");
const { verifyToken, verifyAdmin } = require("../helper/middleware");
const multer = require("multer");
// const { join } = require("path");

// const upload = multer({ dest: join(root, "public", "images") });

// const { upload } = require("../helper/utils");

const router = require("express").Router();

router.route("/").get(getProducts).post(verifyToken, verifyAdmin, postProduct);
router
  .route("/:id")
  .get(getProductById)
  .patch(verifyToken, verifyAdmin, updateProduct)
  .delete(verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
