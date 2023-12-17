const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, `../logs/${process.env.CRYPTO_LIBRARY}.csv`),
  {
    flags: "a",
  }
);

morgan.token("resBodySize", (req, res) => {
  return res.bodySize
    ? `response body: ${res.bodySize} bytes`
    : "response body: -";
});

const logData = (tokens, req, res) => {
  const headersSize = Buffer.byteLength(JSON.stringify(req.headers));

  if (!accessLogStream.hasHeader) {
    accessLogStream.write(
      "method,route,status code,request header size,request body size,response body size,response time\n"
    );
    accessLogStream.hasHeader = true;
  }

  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    `${headersSize}`,
    tokens.req(req, res, "content-length") || 0,

    `${res.bodySize}`,
    tokens["response-time"](req, res),
  ].join(",");
};

const calculateResponseBodySize = (_req, res, next) => {
  const oldWrite = res.write;
  const oldEnd = res.end;
  const chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);
    return oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) chunks.push(chunk);
    const body = Buffer.concat(chunks).toString("utf8");
    res.bodySize = Buffer.byteLength(body, "utf8");
    oldEnd.apply(res, arguments);
  };
  next();
};

const morganStream = morgan(logData, {
  stream: accessLogStream,
});

module.exports = {
  morganStream,
  calculateResponseBodySize,
};
