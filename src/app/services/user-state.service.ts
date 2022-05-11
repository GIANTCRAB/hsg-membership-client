import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LoginTokenEntity } from '../entities/login-token.entity';
import { BehaviorSubject } from 'rxjs';
import { UserEntity } from '../entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private readonly TOKEN_KEY = 'user-token';
  public readonly userProfile$: BehaviorSubject<UserEntity | undefined> =
    new BehaviorSubject<UserEntity | undefined>(undefined);

  constructor(private readonly storageService: StorageService) {}

  public clearToken(): void {
    this.storageService.removeItem(this.TOKEN_KEY);
    this.resetUserProfile();
  }

  public setToken(tokenValue: LoginTokenEntity) {
    this.storageService.setJson(this.TOKEN_KEY, tokenValue);
    if (tokenValue.user) {
      this.setUserProfile(tokenValue.user);
    }
  }

  public getToken(): LoginTokenEntity | null {
    return this.storageService.getJson<LoginTokenEntity>(this.TOKEN_KEY);
  }

  public setUserProfile(userProfile: UserEntity) {
    this.userProfile$.next(userProfile);
  }

  public resetUserProfile() {
    this.userProfile$.next(undefined);
  }
}
