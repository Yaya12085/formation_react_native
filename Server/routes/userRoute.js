const express = require("express");
const {
  Register,
  Login,
  Update,
  Current,
} = require("../controllers/userController");
const { checkAuth } = require("../middleware");

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.put("/:userId", checkAuth, Update);
router.get("/current", checkAuth, Current);

module.exports = router;
