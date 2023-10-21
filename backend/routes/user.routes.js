const router = require("express").Router();

const {
  login,
  register,
  logout,
  tokenStatus,
} = require("../controller/user.controller");

const { isAuthenticated } = require("../middleware/user.middleware");

router.post("/login", login);

router.post("/register", register);

router.post("/logout", isAuthenticated, logout);

router.get("/token-status", isAuthenticated, tokenStatus);

module.exports = router;
