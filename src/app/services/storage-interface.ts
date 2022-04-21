export interface StorageInterface {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  getJson<T>(key: string): T | null;
  setJson(key: string, value: object): void;
}
