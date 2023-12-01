const crypto = require("crypto");
const fs = require("fs");

const cipherData = fs.readFileSync(`${__dirname}/key.json`);
const { key, algorithm } = JSON.parse(cipherData);

const encrypt = (data) => {
  const iv = crypto.randomBytes(8).toString("hex");
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${encrypted}:${iv}`;
};

const decrypt = (data) => {
  const [encryptedString, iv] = data.split(":");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedString, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encrypt, decrypt };
