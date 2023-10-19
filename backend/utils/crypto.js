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

const saveCryptoKeys = async () => {
  const keyPair = await getCryptoLibrary().keyPair();
  process.env.CRYPTO_PRIVATE_KEY = decodeKey(keyPair.privateKey);
  process.env.CRYPTO_PUBLIC_KEY = decodeKey(keyPair.publicKey);
};

module.exports = { getCryptoLibrary, saveCryptoKeys };
