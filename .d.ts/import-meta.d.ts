declare interface ImportMeta {
  glob<T = any>(path: string): Record<string, () => Promise<T>>;
}
