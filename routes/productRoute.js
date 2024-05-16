const {
  getProductById,
  updateProduct,
  deleteProduct,
  getProducts,
  postProduct,
} = require("../controllers/productController");
const { verifyToken, verifyAdmin } = require("../helper/middleware");
const { upload } = require("../helper/utils");

const router = require("express").Router();

router.route("/").get(getProducts).post(verifyToken, verifyAdmin, upload, postProduct);
router
  .route("/:id")
  .get(getProductById)
  .patch(verifyToken, verifyAdmin, upload, updateProduct)
  .delete(verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
