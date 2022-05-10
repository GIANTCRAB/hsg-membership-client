import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LoginTokenEntity } from '../entities/login-token.entity';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private readonly TOKEN_KEY = 'user-token';

  constructor(private readonly storageService: StorageService) {}

  public clearToken(): void {
    this.storageService.removeItem(this.TOKEN_KEY);
  }

  public setToken(tokenValue: LoginTokenEntity) {
    this.storageService.setJson(this.TOKEN_KEY, tokenValue);
  }

  public getToken(): LoginTokenEntity | null {
    return this.storageService.getJson<LoginTokenEntity>(this.TOKEN_KEY);
  }
}
