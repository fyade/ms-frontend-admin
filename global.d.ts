import { FileHandle } from "node:fs/promises";

declare global {
  interface Window {
    showOpenFilePicker?: () => Promise<FileHandle[]>;
  }
}

export {}