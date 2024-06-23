import CryptoJS from "crypto-js"
import { SECRET_KEY } from "../../config/authConfig.ts";

export function encrypt(str: string): string {
  const encrypted = CryptoJS.AES.encrypt(str, SECRET_KEY).toString()
  return encrypted
}
