const { getUserById, getUsers } = require("../controllers/userController");

const router = require("express").Router();

router.route("/").get(getUsers);
router.route("/:id").get(getUserById);

module.exports = router;
