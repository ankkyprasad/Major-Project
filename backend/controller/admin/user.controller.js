const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.updateRole = async (req, res) => {
  try {
    const { role, email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "not found",
        message: "user does not exist",
      });
    }

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        role: role,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "role updated!!",
    });
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};
