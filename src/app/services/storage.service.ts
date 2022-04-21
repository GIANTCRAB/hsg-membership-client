import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StorageInterface } from './storage-interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements StorageInterface {
  private readonly window: Window;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    if (this.document.defaultView) {
      this.window = this.document.defaultView;
    } else {
      this.window = window;
    }
  }

  getItem(key: string): string | null {
    return this.window.localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.window.localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    this.window.localStorage.removeItem(key);
  }

  getJson<T>(key: string): T | null {
    const jsonString = this.window.localStorage.getItem(key);
    if (jsonString === null) {
      return null;
    } else {
      return JSON.parse(jsonString);
    }
  }

  setJson(key: string, value: object): void {
    this.window.localStorage.setItem(key, JSON.stringify(value));
  }
}
