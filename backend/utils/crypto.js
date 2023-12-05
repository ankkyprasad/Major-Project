const { decodeKey } = require("./encoder");

const getCryptoLibrary = () => {
  if (process.env.CRYPTO_LIBRARY == "DILITHIUM") {
    return require("dilithium-crystals");
  } else if (process.env.CRYPTO_LIBRARY == "SPHINCS") {
    return require("sphincs-legacy");
  } else if (process.env.CRYPTO_LIBRARY == "SUPERSPHINCS") {
    return require("supersphincs");
  } else if (process.env.CRYPTO_LIBRARY == "SUPERDILITHIUM") {
    return require("superdilithium");
  }

  return require("falcon-crypto");
};

const generateKeyPair = async () => {
  const keyPair = await getCryptoLibrary().keyPair();
  return {
    publicKey: decodeKey(keyPair.publicKey),
    privateKey: decodeKey(keyPair.privateKey),
  };
};

const generateRawKeyPair = async () => {
  const keyPair = await getCryptoLibrary().keyPair();
  return {
    publicKey: keyPair.publicKey,
    privateKey: keyPair.privateKey,
  };
};

const saveCryptoKeys = async () => {
  const { privateKey, publicKey } = await generateKeyPair();

  process.env.CRYPTO_PRIVATE_KEY = privateKey;
  process.env.CRYPTO_PUBLIC_KEY = publicKey;
};

module.exports = {
  getCryptoLibrary,
  saveCryptoKeys,
  generateKeyPair,
  generateRawKeyPair,
};
