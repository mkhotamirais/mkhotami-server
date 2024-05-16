const { getTags, getTagById, postTag, updateTag, deleteTag } = require("../controllers/tagController");
const { verifyToken, verifyAdmin } = require("../helper/middleware");

const router = require("express").Router();

router.route("/").get(getTags).post(verifyToken, verifyAdmin, postTag);
router.route("/:id").get(getTagById).patch(verifyToken, verifyAdmin, updateTag).delete(verifyToken, verifyAdmin, deleteTag);

module.exports = router;
