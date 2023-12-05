const { PrismaClient } = require("@prisma/client");
const auth = require("../utils/auth");

const prisma = new PrismaClient();

exports.isAuthenticated = async (req, res, next) => {
  const signature =
    req.body.signature || req.headers.authorization?.split(" ")[1] || "";

  try {
    const tokenExists = await prisma.blacklistToken.findFirst({
      where: {
        token: signature,
      },
    });

    if (tokenExists) {
      return res.status(401).json({
        status: "unauthorized",
      });
    }

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
      include: {
        KeyPair: true,
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
