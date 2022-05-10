import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, first } from 'rxjs';
import { FormState } from '../shared-interfaces/form-state';
import { ApiService } from '../services/api.service';
import { LoginTokenEntity } from '../entities/login-token.entity';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { HttpErrorExceptionMessage } from '../shared-interfaces/http-error-exception-message';
import { UserStateService } from '../services/user-state.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loginFormState$: BehaviorSubject<FormState> = new BehaviorSubject<FormState>({
    isLoading: false,
    isSuccessful: false,
    hasErrors: false,
    errorState: undefined,
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService,
    private readonly userStateService: UserStateService
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login() {
    this.loginFormState$.next({
      isLoading: true,
      isSuccessful: false,
      hasErrors: false,
      errorState: undefined,
    });

    this.apiService
      .post<LoginTokenEntity>('/user-auth/login', this.loginForm.getRawValue())
      .pipe(first())
      .subscribe({
        next: (result) => {
          this.loginFormState$.next({
            isLoading: false,
            isSuccessful: true,
            hasErrors: false,
            errorState: undefined,
          });
          this.userStateService.setToken(result);
        },
        error: (error: HttpErrorResponse) => {
          if (
            error.status === HttpStatusCode.BadRequest ||
            error.status === HttpStatusCode.UnprocessableEntity
          ) {
            const errorMessage: HttpErrorExceptionMessage = error.error;
            // Validation errors
            this.loginFormState$.next({
              isLoading: false,
              isSuccessful: false,
              hasErrors: true,
              errorState: errorMessage,
            });
          } else {
            this.loginFormState$.next({
              isLoading: false,
              isSuccessful: false,
              hasErrors: true,
              errorState: {
                status: error.status,
                errors: [{ email: 'Server error, please try again.' }],
              },
            });
          }
        },
      });
  }
}
