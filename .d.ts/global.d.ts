import { FileHandle } from "node:fs/promises";

declare global {
  interface Window {
    showOpenFilePicker: ({multiple}: { multiple: boolean }) => Promise<FileSystemFileHandle[]>;
  }
}

export {}
