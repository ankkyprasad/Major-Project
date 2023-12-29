const router = require("express").Router();

const { updateRole } = require("../../controller/admin/user.controller");

const {
  isAuthenticated,
  isAdmin,
} = require("../../middleware/user.middleware");

router.post("/update-role", isAuthenticated, isAdmin, updateRole);

module.exports = router;
