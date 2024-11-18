import CryptoJS from "crypto-js"
import { SECRET_KEY } from "../../config/config.ts";

/**
 * 双向加密的加密
 * @param str 
 * @returns 
 */
export function encrypt(str: string): string {
  const encrypted = CryptoJS.AES.encrypt(str, SECRET_KEY).toString()
  return encrypted
}

/**
 * 双向加密的解密
 * @param encryptedStr 
 * @returns 
 */
export function decrypt(encryptedStr: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedStr, SECRET_KEY);
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  return originalPassword;
}
