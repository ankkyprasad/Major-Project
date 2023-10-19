require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { saveCryptoKeys } = require("./utils/crypto");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: false }));

app.use("/api/v1/users", require("./routes/user.routes"));
app.use("/api/v1", require("./routes/index.routes"));

app.listen(PORT, async (err) => {
  if (err) throw err;

  saveCryptoKeys();
  console.log(`http://localhost:${PORT}`);
});
