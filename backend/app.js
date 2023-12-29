require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { saveCryptoKeys } = require("./utils/crypto");
const { PrismaClient } = require("@prisma/client");
const { morganStream, calculateResponseBodySize } = require("./utils/morgan");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: false }));

app.use(calculateResponseBodySize);
app.use(morganStream);

app.use("/api/v1/users", require("./routes/user.routes"));
app.use("/api/v1/files", require("./routes/file.routes"));
app.use("/api/v1", require("./routes/index.routes"));

app.use("/api/v1/admin/users", require("./routes/admin/user.routes"));
app.use("/api/v1/admin/files", require("./routes/admin/file.routes"));

app.listen(PORT, async (err) => {
  if (err) throw err;

  saveCryptoKeys();
  await prisma.blacklistToken.deleteMany({});

  console.log(`http://localhost:${PORT}`);
});
