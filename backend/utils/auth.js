const cryptoLibrary = require("./crypto").getCryptoLibrary();
const { encodeKey, decodeKey, decodeToken, encodeToken } = require("./encoder");

const generateSignature = async (token) => {
  try {
    const privateKey = encodeKey(process.env.CRYPTO_PRIVATE_KEY);
    const encodedToken = encodeToken(token);

    const signature = await cryptoLibrary.sign(encodedToken, privateKey);
    const decodedSignature = decodeKey(signature);

    return decodedSignature;
  } catch (err) {
    return err;
  }
};

const verifySignature = async (signature) => {
  try {
    const publicKey = encodeKey(process.env.CRYPTO_PUBLIC_KEY);
    const encodedSignature = encodeKey(signature);

    const token = await cryptoLibrary.open(encodedSignature, publicKey);

    const isValid = await cryptoLibrary.verifyDetached(
      encodedSignature,
      token,
      publicKey
    );

    if (isValid) {
      const decodedToken = decodeToken(token);
      return decodedToken;
    } else throw new Error("Invalid Signature");
  } catch (err) {
    return err;
  }
};

module.exports = { generateSignature, verifySignature };
