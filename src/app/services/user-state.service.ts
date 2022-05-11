import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LoginTokenEntity } from '../entities/login-token.entity';
import { ApiService } from './api.service';
import { catchError, map, Observable, of } from 'rxjs';
import { UserEntity } from '../entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private readonly TOKEN_KEY = 'user-token';

  constructor(
    private readonly storageService: StorageService,
    private readonly apiService: ApiService
  ) {}

  public clearToken(): void {
    this.storageService.removeItem(this.TOKEN_KEY);
  }

  public setToken(tokenValue: LoginTokenEntity) {
    this.storageService.setJson(this.TOKEN_KEY, tokenValue);
  }

  public getToken(): LoginTokenEntity | null {
    return this.storageService.getJson<LoginTokenEntity>(this.TOKEN_KEY);
  }

  public isLoggedIn(): boolean | Observable<boolean> {
    if (this.getToken() !== null) {
      return this.apiService
        .authenticatedGet<UserEntity>('/user-profiles/self')
        .pipe(
          catchError(() => of(null)),
          map((result) => result !== null && result !== undefined)
        );
    }

    return false;
  }

  public isLoggedInMember(): boolean | Observable<boolean> {
    if (this.getToken() !== null) {
      return this.apiService
        .authenticatedGet<UserEntity>('/user-profiles/self')
        .pipe(
          catchError(() => of(null)),
          map((result) => {
            if (result !== null && result !== undefined) {
              return result.is_member;
            }

            return false;
          })
        );
    }

    return false;
  }

  public isLoggedInAdmin(): boolean | Observable<boolean> {
    if (this.getToken() !== null) {
      return this.apiService
        .authenticatedGet<UserEntity>('/user-profiles/self')
        .pipe(
          catchError(() => of(null)),
          map((result) => {
            if (result !== null && result !== undefined) {
              return result.is_admin;
            }

            return false;
          })
        );
    }

    return false;
  }
}
