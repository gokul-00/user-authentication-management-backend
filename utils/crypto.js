// utils/crypto.js

const { createPublicKey, createPrivateKey, privateDecrypt, publicEncrypt } = require("crypto");

const keys = require("../config/keys");

// function to encrypt data using the public key
const privateKeyPemFixed = keys.privateKey.replace(/\\n/g, "\n");
const privateKey = createPrivateKey(privateKeyPemFixed);
const publicKeyPemFixed = keys.publicKey.replace(/\\n/g, "\n");
const publicKey = createPublicKey(publicKeyPemFixed);



const encrypt = (text) => {
    console.log(publicKey)
  const buffer = Buffer.from(text, "utf8");
  const encrypted = publicEncrypt(publicKey, buffer);
  return encrypted.toString("hex");
}

const decrypt = (cipher) => {
  const buffer = Buffer.from(cipher, "hex");
  const decrypted = privateDecrypt(privateKey, buffer);
  return decrypted.toString("utf8");
}
module.exports = { encrypt, decrypt };
