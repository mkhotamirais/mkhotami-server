const {
  getUserById,
  getUsers,
  postUser,
  deleteUser,
  updateUser,
  signin,
  signup,
  signout,
  getMe,
  deleteMe,
  updateMe,
} = require("../controllers/userController");
const { verifyToken, verifyAdmin } = require("../helper/middleware");
const { updateMany } = require("../models/userModel");

const router = require("express").Router();

router.post("/signup", signup);
router.patch("/signin", signin);
router.use(verifyToken);
router.route("/me").get(getMe).patch(updateMe).delete(deleteMe);
router.patch("/signout", signout);
router.use(verifyAdmin);
router.route("/").get(getUsers).post(postUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
