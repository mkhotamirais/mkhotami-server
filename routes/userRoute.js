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
} = require("../controllers/userController");
const { verifyToken, verifyAdmin } = require("../helper/middleware");

const router = require("express").Router();

router.post("/signup", signup);
router.patch("/signin", signin);
router.use(verifyToken);
router.get("/me", getMe);
router.patch("/signout", signout);
router.use(verifyAdmin);
router.route("/").get(getUsers).post(postUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
