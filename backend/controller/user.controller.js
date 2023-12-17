const date = new Date();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const auth = require("../utils/auth");
const { generateRawKeyPair } = require("../utils/crypto");

const prisma = new PrismaClient();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email || "",
      },
    });

    const isPasswordCorrect = user
      ? await bcrypt.compare(password || "", user.password)
      : undefined;

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        status: "bad request",
        message: "invalid username or password",
      });
    }

    const payload = { id: user.id, createdAt: date };
    const signature = await auth.generateSignature(
      `h ${JSON.stringify(payload)}`
    );

    return res.status(200).json({
      status: "login successful",
      data: {
        signature,
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(422).json({
        status: "unprocessable entity",
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { publicKey, privateKey } = await generateRawKeyPair();
    await prisma.keyPair.create({
      data: {
        publicKey: publicKey,
        privateKey: privateKey,
        userId: newUser.id,
      },
    });

    return res.status(201).json({
      status: "created",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};

exports.tokenStatus = async (req, res) => {
  var user = { ...req.user };
  delete user["KeyPair"];

  res.status(200).json({
    status: "success",
    data: {
      user: user,
    },
  });
};

exports.logout = async (req, res) => {
  const signature = req.body.signature;

  try {
    await prisma.blacklistToken.create({
      data: {
        token: signature,
      },
    });

    return res.status(200).send({
      status: "success",
      message: "logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "internal server error",
      message: err.message,
    });
  }
};
