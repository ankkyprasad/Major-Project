const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs").promises;
const path = require("path");

const { getCryptoLibrary } = require("../../utils/crypto");

exports.getAllFiles = async (_req, res) => {
  try {
    const files = await prisma.file.findMany({
      select: {
        id: true,
        userId: true,
        originalName: true,
        uniqueName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      files,
    });
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const file = await prisma.file.findFirst({
      where: {
        id: id,
      },
    });

    if (!file)
      return res.status(404).json({
        status: "not found",
        message: "file does not exist!!",
      });

    await prisma.file.delete({
      where: {
        id: id,
      },
    });

    res.status(204);
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const fileId = parseInt(req.params.id);
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
    });

    if (!file) {
      return res.status(404).json({
        status: "not found",
        message: "file does not exist",
      });
    }

    const keyPair = await prisma.keyPair.findUnique({
      where: {
        userId: file.userId,
      },
    });

    // decrypt the file
    const publicKey = keyPair.publicKey;
    const decryptFile = await getCryptoLibrary().open(file.buffer, publicKey);

    // write the file on the given path
    const tempFilePath = path.join(__dirname, file.originalName);
    await fs.writeFile(tempFilePath, Buffer.from(decryptFile));

    res.sendFile(tempFilePath, () => {
      fs.unlink(tempFilePath);
    });
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};
