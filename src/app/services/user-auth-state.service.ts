import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UserEntity } from '../entities/user.entity';
import { UserStateService } from './user-state.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthStateService {
  constructor(
    private readonly userStateService: UserStateService,
    private readonly apiService: ApiService
  ) {}

  public isLoggedIn(): boolean | Observable<boolean> {
    if (this.userStateService.getToken() !== null) {
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
    if (this.userStateService.getToken() !== null) {
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
    if (this.userStateService.getToken() !== null) {
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
