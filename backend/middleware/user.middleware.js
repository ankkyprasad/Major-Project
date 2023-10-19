const { PrismaClient } = require("@prisma/client");
const auth = require("../utils/auth");

const prisma = new PrismaClient();

exports.isAuthenticated = async (req, res, next) => {
  const signature = req.body.signature;

  try {
    const data = await auth.verifySignature(signature);

    if (data.message) {
      return res.status(401).json({
        status: "unauthorized",
      });
    }

    const payload = JSON.parse(data.split(" ")[1]);
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: "unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};
