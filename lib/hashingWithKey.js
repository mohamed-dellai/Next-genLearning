const CryptoJS = require('crypto-js');

// Encryption function
export function encrypt(text,key) {
    // Encrypt text
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    return encrypted;
  }
  

// Decryption function
export function decrypt(ciphertext) {
    // Decrypt text
    const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
  