const router = require("express").Router();
const { isAuthenticated } = require("../middleware/user.middleware");

router.get("/dashboard", isAuthenticated, async (req, res) => {
  res.json({
    status: "success",
    message: `Hi ${req.user.name}`,
  });
});

module.exports = router;
