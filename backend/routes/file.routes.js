const router = require("express").Router();
const upload = require("../utils/multer");

const { isAuthenticated } = require("../middleware/user.middleware");
const {
  uploadFile,
  getAllFiles,
  downloadFile,
} = require("../controller/file.controller");

router.get("/", isAuthenticated, getAllFiles);

router.post("/upload", isAuthenticated, upload.single("file"), uploadFile);

router.get("/download/:id", isAuthenticated, downloadFile);

module.exports = router;
