import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  constructor() {}

  public clearToken(): void {}

  public getToken(): string {
    return '';
  }
}
