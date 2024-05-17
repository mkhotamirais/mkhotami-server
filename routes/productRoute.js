const {
  getProductById,
  updateProduct,
  deleteProduct,
  getProducts,
  postProduct,
} = require("../controllers/productController");
const { verifyToken, verifyAdmin } = require("../helper/middleware");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.join(__dirname, "..", "public", "images") });

// const { upload } = require("../helper/utils");

const router = require("express").Router();

router.route("/").get(getProducts).post(verifyToken, verifyAdmin, upload.single("image"), postProduct);
router
  .route("/:id")
  .get(getProductById)
  .patch(verifyToken, verifyAdmin, updateProduct)
  .delete(verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
