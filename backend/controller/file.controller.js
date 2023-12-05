const fs = require("fs").promises;
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { getCryptoLibrary } = require("../utils/crypto");

const getAllFiles = async (req, res) => {
  try {
    const files = await prisma.file.findMany({
      where: {
        userId: req.user.id,
      },
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

const downloadFile = async (req, res) => {
  const fileId = parseInt(req.params.id);

  try {
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
        userId: req.user.id,
      },
    });

    if (!file) {
      return res.status(404).json({
        status: "not found",
        message: "file does not exist",
      });
    }

    // decrypt the file
    const publicKey = req.user.KeyPair.publicKey;
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

const uploadFile = async (req, res) => {
  try {
    const privateKey = req.user.KeyPair.privateKey;
    const fileBuffer = new Uint8Array(req.file.buffer);
    const sign = await getCryptoLibrary().sign(fileBuffer, privateKey);

    await prisma.file.create({
      data: {
        buffer: sign,
        originalName: req.file.originalname,
        uniqueName: `${req.user.id}_${Date.now()}`,
        userId: req.user.id,
      },
    });

    res.status(201).json({ message: "File uploaded successfully!" });
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};

module.exports = { uploadFile, getAllFiles, downloadFile };
