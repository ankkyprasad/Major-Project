const router = require("express").Router();

const {
  getAllFiles,
  deleteFile,
  downloadFile,
} = require("../../controller/admin/file.controller");

const {
  isAuthenticated,
  isAdmin,
} = require("../../middleware/user.middleware");

router.get("/", isAuthenticated, isAdmin, getAllFiles);

router.delete("/:id", isAuthenticated, isAdmin, deleteFile);

router.get("/download/:id", isAuthenticated, isAdmin, downloadFile);

module.exports = router;
