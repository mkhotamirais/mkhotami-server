const { getUserById, getUsers, postUser } = require("../controllers/userController");

const router = require("express").Router();

router.route("/").get(getUsers).post(postUser);
router.route("/:id").get(getUserById);

module.exports = router;
