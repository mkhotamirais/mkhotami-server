const { getKamusById, updateKamus, getKamus, postKamus, deleteKamus } = require("../controllers/kamusController");
const { verifyToken, verifyAdmin } = require("../helper/middleware");
const router = require("express").Router();

router.use(verifyToken, verifyAdmin);
router.route("/").get(getKamus).post(postKamus);
router.route("/:id").get(getKamusById).patch(updateKamus).delete(deleteKamus);

module.exports = router;
