const { signin, signup, signout, getMe, updateMe, deleteMe } = require("../controllers/authController");
const { verifyToken } = require("../helper/middleware");

const router = require("express").Router();

router.route("/signup").post(signup);
router.route("/signout").patch(verifyToken, signout);
router.route("/signin").patch(signin);
router.route("/me").get(verifyToken, getMe).patch(verifyToken, updateMe).delete(verifyToken, deleteMe);

module.exports = router;
