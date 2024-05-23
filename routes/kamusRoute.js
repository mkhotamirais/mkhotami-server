const { getKamusById, updateKamus, getKamus, postKamus, deleteKamus } = require("../controllers/kamusController");
const { verifyToken, verifyAdmin } = require("../helper/middleware");
const router = require("express").Router();

router.route("/").get(getKamus).post(verifyToken, verifyAdmin, postKamus);
router
  .route("/:id")
  .get(getKamusById)
  .patch(verifyToken, verifyAdmin, updateKamus)
  .delete(verifyToken, verifyAdmin, deleteKamus);

module.exports = router;
