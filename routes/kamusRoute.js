const { getKamusById, updateKamus, getKamus, postKamus, deleteKamus } = require("../controllers/kamusController");
const { verifyToken, verifyAdmin } = require("../helper/middleware");
const router = require("express").Router();

router.get("/", getKamus);
router.get("/:id", getKamusById);
router.use(verifyToken, verifyAdmin);
router.route("/").post(postKamus);
router.route("/:id").patch(updateKamus).delete(deleteKamus);

module.exports = router;
